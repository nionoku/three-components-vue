import { useInitEventEmits } from '@/composes/events/init';
import { useGeometry } from '@/composes/geometry';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { PlaneGeometry } from 'three';
import {
  defineComponent, PropType, watch,
} from 'vue';

export type PlaneGeometryComponent = Pick<PlaneGeometry, 'isBufferGeometry'>

const createGeometry = (parameters?: Partial<PlaneGeometry['parameters']>) => {
  const geometry = new PlaneGeometry(
    parameters?.width,
    parameters?.height,
    parameters?.widthSegments,
    parameters?.heightSegments,
  );

  return geometry;
};

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    parameters: {
      type: Object as PropType<Partial<PlaneGeometry['parameters']>>,
      default: undefined,
    },
  },
  emits: {
    ...useInitEventEmits<PlaneGeometry>(),
  },
  setup(props, { emit, expose }) {
    const geometryFactory = () => createGeometry({ ...props.parameters });
    const {
      geometry,
      geometryParametersChangedCallback,
    } = useGeometry(null, geometryFactory);
    // emit init action
    emit('init', geometry);

    // watch by parameters changed
    watch(() => props.parameters, geometryParametersChangedCallback, { deep: true });

    const exposed: PlaneGeometryComponent = {
      isBufferGeometry: true,
    };
    // expose public instances
    expose(exposed);
  },
});
