import {
  defineComponent, onBeforeUnmount, PropType, watch,
} from 'vue';
import {
  Color, ColorRepresentation, FogBase, FogExp2, Scene,
} from 'three';
import { RenderEmitter } from '@/utils/emitter';
import { Object3DComponent } from '@/types/object3d';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { useParentRenderer } from '@/composes/parent/renderer';

interface FogDescription {
  color?: ColorRepresentation,
  density?: number
}
interface Props {
  paramaters?: {
    background?: ColorRepresentation
    fog?: ColorRepresentation | FogDescription
  }
}

export type SceneComponent = Pick<Scene, 'isScene'> & Object3DComponent

function makeFog(
  fog: ColorRepresentation | FogDescription,
  fallbackColor?: ColorRepresentation,
): FogBase {
  const [color, density] = typeof fog === 'string' || typeof fog === 'number' || fog instanceof Color
    ? [
      new Color(fog || fallbackColor),
      undefined,
    ]
    : [
      new Color(fog.color || fallbackColor),
      fog.density,
    ];

  return new FogExp2(color.getHex(), density);
}

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    parameters: {
      type: Object as PropType<Props['paramaters']>,
      default: null,
    },
  },
  setup(props, { expose }) {
    const scene: Scene = new Scene();

    // watch for parameters changed
    const unsubscribeParametersWatch = watch(
      () => props.parameters,
      (value) => {
        if (value?.background) {
          scene.background = new Color(value.background);
        }

        if (value?.fog) {
          scene.fog = makeFog(value.fog, value.background);
        }
      },
      { deep: true, immediate: true },
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
      add: (objects) => scene.add(objects),
      remove: (objects) => scene.remove(objects),
    };
    // expose public instances
    expose(exposed);
  },
});
