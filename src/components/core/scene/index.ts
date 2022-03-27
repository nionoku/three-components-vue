import {
  defineComponent, getCurrentInstance, onBeforeUnmount, PropType, watch,
} from 'vue';
import { RendererComponent } from '@/components/core/renderer';
import {
  Color, ColorRepresentation, Scene,
} from 'three';
import { RenderEmitter } from '@/utils/emitter';
import { Object3DComponent } from '@/types/object3d';

interface Props {
  paramaters?: {
    background?: Scene['background'] | ColorRepresentation
  }
}

export type SceneComponent = Pick<Scene, 'isScene'> & Object3DComponent

function useParentRenderer(): { renderer: RendererComponent } {
  const instance = getCurrentInstance();
  const renderer = instance?.parent?.exposed as RendererComponent;

  if (!renderer.isRenderer) {
    throw new Error('Scene must be child of renderer');
  }

  return {
    renderer,
  };
}

export default defineComponent({
  props: {
    parameters: {
      type: Object as PropType<Props['paramaters']>,
      default: null,
    },
  },
  setup(props, { expose }) {
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
    const parametersWatcherCanceler = watch(
      () => props.parameters,
      (value, prev) => {
        if (value?.background && value.background !== prev?.background) {
          scene.background = background();
        }
      },
      { deep: true },
    );

    const { renderer } = useParentRenderer();
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
      parametersWatcherCanceler();

      scene?.removeFromParent();
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
