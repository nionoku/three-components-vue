import { useMaterial } from '@/composes/material';
import {
  MeshBasicMaterial, MeshBasicMaterialParameters,
} from 'three';
import {
  defineComponent, PropType, watch,
} from 'vue';

const createMaterial = (parameters: Partial<MeshBasicMaterialParameters>) => {
  const material = new MeshBasicMaterial(parameters);

  return material;
};

export default defineComponent({
  props: {
    parameters: {
      type: Object as PropType<MeshBasicMaterialParameters>,
      default: null,
    },
  },
  setup(props) {
    const {
      material,
      materialParametersChangedCallback,
    } = useMaterial(() => createMaterial(props.parameters));

    // watch by parameters changed
    watch(() => props.parameters, materialParametersChangedCallback, { deep: true });
  },
  render() {
    return this.$slots?.default?.() || [];
  },
});
