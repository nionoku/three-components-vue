import { useInitEventEmits } from '@/composes/events/init';
import { useMaterial } from '@/composes/material';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import {
  MeshBasicMaterial, MeshBasicMaterialParameters,
} from 'three';
import {
  defineComponent, PropType, watch,
} from 'vue';

export type BasicMaterialComponent = Pick<MeshBasicMaterial, 'isMaterial'>

const createMaterial = (parameters: Partial<MeshBasicMaterialParameters>) => {
  const material = new MeshBasicMaterial({ ...parameters });

  return material;
};

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    parameters: {
      type: Object as PropType<MeshBasicMaterialParameters>,
      default: null,
    },
  },
  emits: {
    ...useInitEventEmits<MeshBasicMaterial>(),
  },
  setup(props, { emit, expose }) {
    const {
      material,
      materialParametersChangedCallback,
    } = useMaterial(null, () => createMaterial(props.parameters));
    // emit init action
    emit('init', material);

    // watch by parameters changed
    watch(() => props.parameters, materialParametersChangedCallback, { deep: true });

    const exposed: BasicMaterialComponent = {
      isMaterial: true,
    };
    // expose public instances
    expose(exposed);
  },
});
