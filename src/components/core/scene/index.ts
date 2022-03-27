import {
  defineComponent, onBeforeUnmount, PropType, watch,
} from 'vue';
import {
  Color, ColorRepresentation, Scene,
} from 'three';
import { RenderEmitter } from '@/utils/emitter';
import { Object3DComponent } from '@/types/object3d';
import { useParentRenderer } from '@/composes/parent-renderer';

interface Props {
  paramaters?: {
    background?: Scene['background'] | ColorRepresentation
  }
}

export type SceneComponent = Pick<Scene, 'isScene'> & Object3DComponent

export default defineComponent({
  props: {
    parameters: {
      type: Object as PropType<Props['paramaters']>,
      default: null,
    },
  },
  setup(props, { expose, emit }) {
    function background(bg = props.parameters?.background): Required<Scene['background']> {
      if (typeof bg === 'string' || typeof bg === 'number') {
        return new Color(bg);
      }

      return bg || new Color('white');
    }

    const scene: Scene = (() => {
      const target = new Scene();
      target.background = background();

      return target;
    })();

    // watch for parameters changed
    const unsubscribeParametersWatch = watch(
      () => props.parameters,
      (value, prev) => {
        if (value?.background && value.background !== prev?.background) {
          scene.background = background();
        }
      },
      { deep: true },
    );

    const { renderer } = useParentRenderer({ invalidTypeMessage: 'Scene must be child of renderer' });
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

    onBeforeUnmount(() => {
      // cancel watch for parameters changed
      unsubscribeParametersWatch();

      scene.removeFromParent();
    });

    const exposed: SceneComponent = {
      isScene: true,
      isObject3D: true,
      add: scene.add,
      remove: scene.remove,
    };
    // expose public instances
    expose(exposed);
  },
  render() {
    return this.$slots?.default?.() || [];
  },
});
