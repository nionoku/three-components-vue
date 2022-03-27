import { useGeometry } from '@/composes/geometry';
import { BoxGeometry } from 'three';
import {
  defineComponent, PropType, watch,
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
    const {
      geometry,
      geometryParametersChangedCallback,
    } = useGeometry(() => createBoxGeometry(props.parameters));

    // watch by parameters changed
    watch(() => props.parameters, geometryParametersChangedCallback, { deep: true });
  },
  render() {
    return this.$slots?.default?.() || [];
  },
});
