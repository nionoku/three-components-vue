import { LightComponent } from '@/components/lights/light';
import { useInitEventEmits } from '@/composes/events/init';
import { useParentObject3D } from '@/composes/parent/object3d';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { assignUserData } from '@/utils/user-data';
import {
  AmbientLight,
  Color, ColorRepresentation,
} from 'three';
import {
  defineComponent, onBeforeUnmount, onMounted, PropType, watch,
} from 'vue';

export type AmbientLightComponent = LightComponent & Pick<AmbientLight, 'isAmbientLight'>

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    parameters: {
      type: Object as PropType<{
        color?: ColorRepresentation
      } & Partial<Pick<AmbientLight, 'intensity' | 'name' | 'userData'>>>,
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

    onMounted(() => {
      // emit mount action
      emit('mounted', light);
    });

    const { object3D } = useParentObject3D(null, { invalidTypeMessage: 'Light must be child of Object3D' });
    object3D.add(light);

    watch(() => props.parameters, (value) => {
      if (value?.color) {
        light.color = new Color(value.color);
      }

      if (value?.intensity) {
        light.intensity = value.intensity;
      }

      if (value?.name) {
        light.name = value.name;
      }

      if (value?.userData) {
        assignUserData(light, value.userData);
      }
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
