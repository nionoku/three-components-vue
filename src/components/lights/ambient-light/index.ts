import { LightComponent } from '@/components/lights/light';
import { useInitEventEmits } from '@/composes/events/init';
import { PointerEventsEmit, usePointerEvents, usePointerEventsEmits } from '@/composes/events/pointer';
import { useParentObject3D } from '@/composes/parent/object3d';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { useTransforms, useTransformsProps } from '@/composes/transform';
import {
  AmbientLight,
  BoxHelper, Color, ColorRepresentation, LineBasicMaterial, Mesh,
} from 'three';
import {
  defineComponent, onBeforeUnmount, PropType, watch,
} from 'vue';

export type AmbientLightComponent = LightComponent & Pick<AmbientLight, 'isAmbientLight'>

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    parameters: {
      type: Object as PropType<{
        color?: ColorRepresentation
        intensity?: number
      }>,
      default: undefined,
    },
  },
  emits: {
    ...useInitEventEmits<AmbientLight>(),
  },
  setup(props, { emit, expose }) {
    const light = new AmbientLight(props?.parameters?.color, props?.parameters?.intensity);
    // const helper = new BoxHelper(mesh);
    // const updateHelper = () => setTimeout(() => helper.update(), 0);
    // emit init action
    emit('init', light);

    const { object3D } = useParentObject3D(null, { invalidTypeMessage: 'Light must be child of Object3D' });
    object3D.add(light);

    watch(() => props.parameters, (parameters) => {
      light.color = new Color(parameters?.color);
      light.intensity = parameters?.intensity || 1;
    }, { deep: true });
    // const helperWatcherCanceler = watch(() => props.helper, (value) => {
    //   if (value) {
    //     (helper.material as LineBasicMaterial).color.set(value);
    //     object3D.add(helper);
    //   } else {
    //     object3D.remove(helper);
    //   }
    // }, { immediate: true });
    // supports pointer events

    onBeforeUnmount(() => {
      // helperWatcherCanceler();

      // helper.removeFromParent();
      light.removeFromParent();
      light.dispose();
    });

    const exposed: AmbientLightComponent = {
      isLight: true,
      isAmbientLight: true,
    };
    // expose public instances
    expose(exposed);
  },
});
