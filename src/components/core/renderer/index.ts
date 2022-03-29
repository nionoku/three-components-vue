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
import { RenderEmitter } from '@/utils/emitter';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { useBeforeRender, useBeforeRenderEmits } from '@/composes/events';
import { useParentCanvas } from '@/composes/parent/canvas';
import { useInitPointerEvents } from '@/composes/events/pointer';

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
  const renderer = new WebGLRenderer(parameters);

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
    observe: resizeObserver.observe,
    disconnect: resizeObserver.disconnect,
  };
}

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    parameters: {
      type: Object as PropType<Props['paramaters']>,
      default: null,
    },
    autoplay: {
      type: Boolean as PropType<Props['autoplay']>,
      default: true,
    },
  },
  emits: {
    ...useBeforeRenderEmits,
  },
  setup(props, { emit, expose }) {
    let renderer: WebGLRenderer | null = null;
    let scene: Scene | null = null;
    let camera: Camera | null = null;

    const {
      observe: subscribeToCanvasResizeEvent,
      disconnect: unsubscribeFromCanvasResizeEvent,
    } = useResizeWatcher(([{ contentRect }]) => {
      renderer?.setViewport(0, 0, contentRect.width, contentRect.height);
      // TODO (2022.03.29): Dispatch resize event to camera
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
      const { canvas } = useParentCanvas({ invalidTypeMessage: 'Parent of renderer must be canvas' });

      renderer = useRenderer({
        canvas,
        ...props.parameters,
      });

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
      subscribeToCanvasResizeEvent(canvas);
      // subscribe on render events
      RenderEmitter.addEventListener('start-rendering', startRendering);
      RenderEmitter.addEventListener('cancel-rendering', cancelRendering);
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
      } = useInitPointerEvents(canvas, camera, scene);
      // subscribe to pointer events
      subscribeToDomPointerEvents();

      onBeforeUnmount(() => {
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

      renderer?.dispose();
      renderer?.domElement?.remove();
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
