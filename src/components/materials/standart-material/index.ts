import { useInitEventEmits } from '@/composes/events/init';
import { useMaterial } from '@/composes/material';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import {
  MeshStandardMaterial, MeshStandardMaterialParameters,
} from 'three';
import {
  defineComponent, PropType, watch,
} from 'vue';

export type StandartMaterialComponent = Pick<MeshStandardMaterial, 'isMaterial' | 'isMeshStandardMaterial'>

const createMaterial = (parameters?: MeshStandardMaterialParameters) => {
  const material = new MeshStandardMaterial(parameters);
  return material;
};

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    parameters: {
      type: Object as PropType<MeshStandardMaterialParameters>,
      default: undefined,
    },
  },
  emits: {
    ...useInitEventEmits<MeshStandardMaterial>(),
  },
  setup(props, { emit, expose }) {
    const material = createMaterial(props.parameters);
    useMaterial(null, material);
    // emit init action
    emit('init', material);
    // watch by parameters changed
    watch(() => props.parameters, (value) => {
      material.setValues({ ...value });
    }, { deep: true });

    const exposed: StandartMaterialComponent = {
      isMaterial: true,
      isMeshStandardMaterial: true,
    };
    // expose public instances
    expose(exposed);
  },
});
