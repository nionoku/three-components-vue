import { useParentMesh } from '@/composes/parent-mesh';
import { BoxGeometry } from 'three';
import {
  defineComponent, onBeforeUnmount, PropType, watch,
} from 'vue';

const createBoxGeometry = (parameters: Partial<BoxGeometry['parameters']>) => {
  const geometry = new BoxGeometry(
    parameters?.width,
    parameters?.height,
    parameters?.depth,
    parameters?.widthSegments,
    parameters?.heightSegments,
    parameters?.depthSegments,
  );

  return geometry;
};

export default defineComponent({
  props: {
    parameters: {
      type: Object as PropType<Partial<BoxGeometry['parameters']>>,
      default: null,
    },
  },
  setup(props) {
    let geometry: BoxGeometry = createBoxGeometry(props.parameters);

    const { mesh: parent } = useParentMesh({ invalidTypeMessage: 'BoxGeometry must be child of Mesh' });
    parent.setGeometry(geometry);

    // watch by parameters changed
    watch(() => props.parameters, (value) => {
      geometry.dispose();
      geometry = createBoxGeometry(value);

      parent.setGeometry(geometry);
    }, { deep: true });

    onBeforeUnmount(() => {
      geometry.dispose();
    });
  },
  render() {
    return this.$slots?.default?.() || [];
  },
});
