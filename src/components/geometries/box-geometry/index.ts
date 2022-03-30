import { useGeometry } from '@/composes/geometry';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { BoxGeometry } from 'three';
import {
  defineComponent, PropType, watch,
} from 'vue';

export type BoxGeometryComponent = Pick<BoxGeometry, 'isBufferGeometry'>

const createGeometry = (parameters: Partial<BoxGeometry['parameters']>) => {
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
  extends: useRenderWithDefaultSlot,
  props: {
    parameters: {
      type: Object as PropType<Partial<BoxGeometry['parameters']>>,
      default: null,
    },
  },
  setup(props, { expose }) {
    const {
      geometryParametersChangedCallback,
    } = useGeometry(null, () => createGeometry(props.parameters));

    // watch by parameters changed
    watch(() => props.parameters, geometryParametersChangedCallback, { deep: true });

    const exposed: BoxGeometryComponent = {
      isBufferGeometry: true,
    };
    // expose public instances
    expose(exposed);
  },
});
