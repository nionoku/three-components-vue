import { useParentMesh } from '@/composes/parent-mesh';
import { MeshBasicMaterial, MeshBasicMaterialParameters } from 'three';
import {
  defineComponent, onBeforeUnmount, PropType, watch,
} from 'vue';

const createBasicMaterial = (parameters: Partial<MeshBasicMaterialParameters>) => {
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
    let material: MeshBasicMaterial = createBasicMaterial(props.parameters);

    const { mesh: parent } = useParentMesh({ invalidTypeMessage: 'BasicMaterial must be child of Mesh' });
    parent.setMaterial(material);

    // watch by parameters changed
    watch(() => props.parameters, (value) => {
      material.dispose();
      material = createBasicMaterial(value);

      parent.setMaterial(material);
    }, { deep: true });

    onBeforeUnmount(() => {
      material.dispose();
    });
  },
  render() {
    return this.$slots?.default?.() || [];
  },
});
