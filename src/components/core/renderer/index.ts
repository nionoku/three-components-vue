import {
  defineComponent,
  getCurrentInstance,
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
import Emitter from 'tiny-emitter/instance';
import { BeforeRenderArguments, RenderEvents } from '@/types/events/render';
import { Handler } from '@/types/handler';

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
  setup(props, { expose }) {
    let renderer: WebGLRenderer | null = null;
    let scene: Scene | null = null;
    let camera: Camera | null = null;

    // create renderer instance
    onMounted(() => {
      // TODO (2022.03.26): Add chech supports webgl
      const canvas: HTMLCanvasElement = getCurrentInstance()?.parent?.proxy?.$el;
      // TODO (2022.03.26): Watch canvas resize

      if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error('Parent of renderer must be canvas');
      }

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

        Emitter.emit<RenderEvents, BeforeRenderArguments>('before-render', {
          time, delta, renderer, scene, camera,
        });
        renderer.render(scene, camera);
      });

      // subscribe on render events
      Emitter.on<RenderEvents>('start-rendering', startRendering);
      Emitter.on<RenderEvents>('cancel-rendering', cancelRendering);
      // emit renderer ready event
      Emitter.emit<RenderEvents>('renderer-ready');
    });
    onBeforeUnmount(() => {
      // cancel rendering
      Emitter.emit<RenderEvents>('cancel-rendering');

      renderer?.dispose();
      renderer?.domElement?.remove();
    });

    const exposed: RendererComponent = {
      isRenderer: true,
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
  render() {
    return this.$slots?.default?.() || [];
  },
});
