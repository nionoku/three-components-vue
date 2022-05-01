import { LightComponent } from '@/components/lights/light';
import { useInitEventEmits } from '@/composes/events/init';
import { useParentObject3D } from '@/composes/parent/object3d';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { useTransforms, useTransformsProps } from '@/composes/transform';
import { assignUserData } from '@/utils/user-data';
import {
  Color, ColorRepresentation, DirectionalLight, DirectionalLightHelper, Object3D, Vector3,
} from 'three';
import {
  defineComponent, onBeforeUnmount, PropType, watch,
} from 'vue';

export type DirectionalLightComponent = LightComponent & Pick<DirectionalLight, 'isDirectionalLight'>

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    position: useTransformsProps.position,
    target: {
      type: Object as PropType<Object3D>,
      default: null,
    },
    parameters: {
      type: Object as PropType<{
        color?: ColorRepresentation
      } & Partial<Pick<DirectionalLight, 'intensity' | 'name' | 'userData'>>>,
      default: null,
    },
    helper: {
      type: [String, Number] as PropType<ColorRepresentation>,
      default: null,
    },
  },
  emits: {
    ...useInitEventEmits<DirectionalLight>(),
  },
  setup(props, { emit, expose }) {
    const light = new DirectionalLight(props.parameters?.color, props.parameters?.intensity);
    const helper = new DirectionalLightHelper(light, undefined, props.helper);
    // emit init action
    emit('init', light);

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

    watch(() => props.helper, (value) => {
      if (value) {
        helper.color = value;
        object3D.add(helper);
      } else {
        object3D.remove(helper);
      }
    }, { immediate: true });
    // supports transforms
    const {
      applyPosition,
    } = useTransforms(light);
    watch(() => props.position, (position) => {
      applyPosition(position);
      helper.update();
    }, { deep: true, immediate: true });
    watch(() => props.target, (target) => {
      if (target) {
        light.target = target;
      }
    }, { deep: true, immediate: true });

    onBeforeUnmount(() => {
      helper.removeFromParent();
      helper.dispose();

      light.removeFromParent();
      light.dispose();
    });

    const exposed: DirectionalLightComponent = {
      isLight: true,
      isDirectionalLight: true,
    };
    // expose public instances
    expose(exposed);
  },
});
