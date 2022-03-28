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
import {
  useBeforeRender, useBeforeRenderEmits, useParentCanvas, useRenderWithDefaultSlot,
} from '@/composes';

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
  whenLoop: ({ time, delta }: { time: number, delta: number }) => void,
): Handler {
  function start() {
    const clock = new Clock(true);

    looper((time) => whenLoop({ time, delta: clock.getDelta() }));
  }

  function cancel() {
    looper(null);
  }

  return {
    start,
    cancel,
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
    ...useBeforeRenderEmits(),
  },
  setup(props, { emit, expose }) {
    let renderer: WebGLRenderer | null = null;
    let scene: Scene | null = null;
    let camera: Camera | null = null;

    // create renderer instance
    onMounted(() => {
      // TODO (2022.03.26): Add chech supports webgl
      const { canvas } = useParentCanvas({ invalidTypeMessage: 'Parent of renderer must be canvas' });
      // TODO (2022.03.26): Watch canvas resize

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

      // subscribe on render events
      RenderEmitter.addEventListener('start-rendering', startRendering);
      RenderEmitter.addEventListener('cancel-rendering', cancelRendering);
      // emit renderer ready event
      RenderEmitter.dispatchEvent({ type: 'renderer-ready' });
    });

    const {
      subscribeToBeforeRender,
      unsubscribeFromBeforeRender,
    } = useBeforeRender(emit);
    // subscribe to before render event
    subscribeToBeforeRender();

    onBeforeUnmount(() => {
      // cancel rendering
      RenderEmitter.dispatchEvent({ type: 'cancel-rendering' });
      // unsubscribe from before render event
      unsubscribeFromBeforeRender();

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
