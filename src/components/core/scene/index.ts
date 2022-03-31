import {
  defineComponent, onBeforeUnmount, PropType, watch,
} from 'vue';
import {
  AxesHelper,
  Color, ColorRepresentation, Fog, Scene,
} from 'three';
import { RenderEmitter } from '@/utils/emitter';
import { Object3DComponent } from '@/types/object3d';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { useParentRenderer } from '@/composes/parent/renderer';
import { useInitEventEmits } from '@/composes/events/init';

const DEFAULT_HELPER_SIZE = 5;

interface Props {
  paramaters?: {
    background?: ColorRepresentation
    fog?: {
      color: ColorRepresentation,
      near: number
      far: number
    }
  }
  helper?: number
}

export type SceneComponent = Pick<Scene, 'isScene'> & Object3DComponent

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    parameters: {
      type: Object as PropType<Props['paramaters']>,
      default: null,
    },
    helper: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    ...useInitEventEmits<Scene>(),
  },
  setup(props, { emit, expose }) {
    const helper = new AxesHelper(DEFAULT_HELPER_SIZE);
    const scene: Scene = new Scene();
    // emit init action
    emit('init', scene);

    // watch for parameters changed
    const unsubscribeParametersWatch = watch(
      () => props.parameters,
      (value) => {
        if (value?.background) {
          scene.background = new Color(value.background);
        }

        if (value?.fog) {
          scene.fog = new Fog(new Color(value.fog.color), value.fog.near, value.fog.far);
        }
      },
      { deep: true, immediate: true },
    );

    const { renderer } = useParentRenderer(null, { invalidTypeMessage: 'Scene must be child of renderer' });
    // subscribe on renderer ready event for start rendering
    RenderEmitter.addEventListener('renderer-ready', () => {
      if (renderer.autoplay) {
        if (!scene) {
          throw new Error('Scene not ready');
        }

        renderer.setScene(scene);
        RenderEmitter.dispatchEvent({ type: 'start-rendering' });
      }
    });
    const helperWatcherCanceler = watch(() => props.helper, (value) => {
      if (value) {
        scene.add(helper);
      } else {
        scene.remove(helper);
      }
    }, { immediate: true });

    onBeforeUnmount(() => {
      // cancel watch for parameters changed
      unsubscribeParametersWatch();

      helperWatcherCanceler();

      helper.removeFromParent();
      helper.dispose();
      scene.removeFromParent();
    });

    const exposed: SceneComponent = {
      isScene: true,
      isObject3D: true,
      add: (objects) => scene.add(objects),
      remove: (objects) => scene.remove(objects),
    };
    // expose public instances
    expose(exposed);
  },
});
