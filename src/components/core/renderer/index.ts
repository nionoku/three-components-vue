import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
} from 'vue';
import {
  WebGLRenderer,
  WebGLRendererParameters,
  Clock,
  Scene,
  Camera,
  XRAnimationLoopCallback,
} from 'three';
import { Handler } from '@/types/handler';
import { RenderEmitter, ResizeEmitter } from '@/utils/emitter';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { useBeforeRender, useBeforeRenderEmits } from '@/composes/events';
import { useParentHtmlElement } from '@/composes/parent/html-element';
import { useInitPointerEvents } from '@/composes/events/pointer';
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { useInitEventEmits } from '@/composes/events/init';

interface Props {
  paramaters?: Partial<Pick<WebGLRenderer, 'pixelRatio'>>
    & Partial<Exclude<WebGLRendererParameters, 'canvas'>>
  /**
   * Start rendering immediate
   */
   autoplay?: boolean
}

export interface RendererComponent {
  isRenderer: true
  autoplay: Required<Props['autoplay']>
  setScene(scene: Scene): void
  setCamera(camera: Camera): void
}

function useRenderer(parameters: Props['paramaters']): WebGLRenderer {
  const renderer = new WebGLRenderer({ ...parameters });

  if (parameters?.pixelRatio) {
    renderer.setPixelRatio(parameters.pixelRatio);
  }

  return renderer;
}

function useLooper(
  looper: (calback: XRAnimationLoopCallback | null) => void,
  onLoop: ({ time, delta }: { time: number, delta: number }) => void,
): Handler {
  function start() {
    const clock = new Clock(true);

    looper((time) => onLoop({ time, delta: clock.getDelta() }));
  }

  function cancel() {
    looper(null);
  }

  return {
    start,
    cancel,
  };
}

function useResizeWatcher(
  onResize: ((entries: Array<ResizeObserverEntry>) => void),
) {
  const resizeObserver = new ResizeObserver(onResize);

  return {
    observe: (element: HTMLElement) => resizeObserver.observe(element),
    disconnect: () => resizeObserver.disconnect(),
  };
}

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    parameters: {
      type: Object as PropType<Props['paramaters']>,
      default: undefined,
    },
    autoplay: {
      type: Boolean as PropType<Props['autoplay']>,
      default: true,
    },
  },
  emits: {
    ...useBeforeRenderEmits,
    ...useInitEventEmits<WebGLRenderer>(),
  },
  setup(props, { emit, expose }) {
    // check supports webgl
    if (!WebGL.isWebGLAvailable()) {
      throw new Error('This browser does not support WebGL');
    }

    const renderer: WebGLRenderer = useRenderer(props.parameters);
    // emit init action
    emit('init', renderer);
    let scene: Scene | null = null;
    let camera: Camera | null = null;

    const {
      observe: subscribeToCanvasResizeEvent,
      disconnect: unsubscribeFromCanvasResizeEvent,
    } = useResizeWatcher(([{ contentRect }]) => {
      if (!scene) {
        throw new Error('Can not render scene after resize. Scene is null');
      }

      if (!camera) {
        throw new Error('Can not render scene after resize. Camera is null');
      }
      // dispath resize emit
      ResizeEmitter.dispatchEvent({
        type: 'resize',
        rect: contentRect,
      });
      // resize scene
      renderer.setSize(contentRect.width, contentRect.height);
      // render scene after resize
      renderer.render(scene, camera);
    });

    const {
      subscribe: subscribeToBeforeRender,
      unsubscribe: unsubscribeFromBeforeRender,
    } = useBeforeRender(emit);
    // subscribe to before render event
    subscribeToBeforeRender();

    // create renderer instance
    onMounted(() => {
      // TODO (2022.03.26): Add chech supports webgl
      const { element } = useParentHtmlElement(null, { invalidTypeMessage: 'Parent of renderer must be canvas' });

      const {
        start: startRendering,
        cancel: cancelRendering,
      } = useLooper(renderer.setAnimationLoop, ({ time, delta }) => {
        if (!renderer) {
          throw new Error('Can not render scene. Renderer is null');
        }

        if (!scene) {
          throw new Error('Can not render scene. Scene is null');
        }

        if (!camera) {
          throw new Error('Can not render scene. Camera is null');
        }

        RenderEmitter.dispatchEvent({
          type: 'before-render',
          time,
          delta,
          renderer,
          scene,
          camera,
        });
        renderer.render(scene, camera);
      });

      // subscribe to canvas resize listener
      subscribeToCanvasResizeEvent(element);
      // subscribe on render events
      RenderEmitter.addEventListener('start-rendering', startRendering);
      RenderEmitter.addEventListener('cancel-rendering', cancelRendering);
      // append canvas in html
      element.appendChild(renderer.domElement);
      // emit renderer ready event
      RenderEmitter.dispatchEvent({ type: 'renderer-ready' });

      if (!scene) {
        throw new Error('Can not prepare render. Scene is null');
      }

      if (!camera) {
        throw new Error('Can not prepare render. Camera is null');
      }

      const {
        subscribe: subscribeToDomPointerEvents,
        unsubscribe: unsubscribeFromDomPointerEvents,
      } = useInitPointerEvents(renderer.domElement, camera, scene);
      // subscribe to pointer events
      subscribeToDomPointerEvents();

      onBeforeUnmount(() => {
        // unsubscribe from dom events
        unsubscribeFromDomPointerEvents();
      });
    });

    onBeforeUnmount(() => {
      // cancel rendering
      RenderEmitter.dispatchEvent({ type: 'cancel-rendering' });
      // unsubscribe from before render event
      unsubscribeFromBeforeRender();
      // unsubscribe from canvas resize listener
      unsubscribeFromCanvasResizeEvent();

      renderer.dispose();
      renderer.domElement?.remove();
    });

    const exposed: RendererComponent = {
      isRenderer: true,
      autoplay: props.autoplay,
      setScene(_scene: Scene) {
        scene = _scene;
      },
      setCamera(_camera: Camera) {
        camera = _camera;
      },
    };
    // expose public instances
    expose(exposed);
  },
});
