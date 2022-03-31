import { useInitEventEmits } from '@/composes/events/init';
import { useGeometry } from '@/composes/geometry';
import { useParentObject3D } from '@/composes/parent/object3d';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { useTransforms, useTransformsProps } from '@/composes/transform';
import { ColorRepresentation, GridHelper } from 'three';
import {
  defineComponent, onBeforeUnmount, PropType, watch,
} from 'vue';

type GridHelperConstructorParameters = {
  size: number,
  divisions: number,
  color1: ColorRepresentation,
  color2: ColorRepresentation
}

const createGridHelper = (parameters?: GridHelperConstructorParameters) => {
  const gridHelper = new GridHelper(
    parameters?.size,
    parameters?.divisions,
    parameters?.color1,
    parameters?.color2,
  );

  return gridHelper;
};

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    ...useTransformsProps,
    parameters: {
      type: Object as PropType<GridHelperConstructorParameters>,
      default: undefined,
    },
  },
  emits: {
    ...useInitEventEmits<GridHelper>(),
  },
  setup(props, { emit }) {
    let gridHelper = createGridHelper(props.parameters);
    // emit init action
    emit('init', gridHelper);

    const { object3D } = useParentObject3D(null, { invalidTypeMessage: 'Mesh must be child of Object3D' });
    object3D.add(gridHelper);

    // watch by parameters changed
    watch(() => props.parameters, (value) => {
      gridHelper.removeFromParent();

      gridHelper = createGridHelper(value);
      object3D.add(gridHelper);
    }, { deep: true });

    // supports transforms
    const {
      applyPosition, applyRotation, applyScale, applyLookAt,
    } = useTransforms(gridHelper);
    watch(() => props.position, applyPosition, { deep: true, immediate: true });
    watch(() => props.rotation, applyRotation, { deep: true, immediate: true });
    watch(() => props.scale, applyScale, { deep: true, immediate: true });
    watch(() => props.lookAt, applyLookAt, { deep: true, immediate: true });

    onBeforeUnmount(() => {
      gridHelper.removeFromParent();
    });
  },
});
