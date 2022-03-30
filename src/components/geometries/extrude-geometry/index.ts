import { useInitEventEmits } from '@/composes/events/init';
import { useGeometry } from '@/composes/geometry';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import {
  ExtrudeGeometry, ExtrudeGeometryOptions, Shape,
} from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import {
  defineComponent, PropType, watch,
} from 'vue';

export type ExtrudeGeometryComponent = Pick<ExtrudeGeometry, 'isBufferGeometry'>

function createGeometry(
  shape?: Shape | Array<Shape>,
  parameters?: Partial<ExtrudeGeometryOptions>,
) {
  const geometry = new ExtrudeGeometry(shape, parameters);
  return geometry;
}

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    svg: {
      type: String,
      default: undefined,
    },
    shape: {
      type: Object as PropType<Shape | Array<Shape>>,
      default: undefined,
    },
    parameters: {
      type: Object as PropType<ExtrudeGeometryOptions>,
      default: undefined,
    },
  },
  emits: {
    ...useInitEventEmits<ExtrudeGeometry>(),
  },
  setup(props, { emit, expose }) {
    const shape = (() => {
      if (props.svg) {
        const svgData = new SVGLoader().parse(props.svg);
        return svgData.paths.map((it) => it.toShapes(true)).flat();
      }

      return props.shape;
    })();

    const {
      geometry,
      geometryParametersChangedCallback,
    } = useGeometry(null, () => createGeometry(shape, props.parameters));
    // emit init action
    emit('init', geometry);

    // watch by parameters changed
    watch(() => props.parameters, geometryParametersChangedCallback, { deep: true });
    // watch by shape changed
    watch(() => props.shape, geometryParametersChangedCallback, { deep: true });
    // watch by svg changed
    watch(() => props.svg, geometryParametersChangedCallback, { deep: true });

    const exposed: ExtrudeGeometryComponent = {
      isBufferGeometry: true,
    };
    // expose public instances
    expose(exposed);
  },
});
