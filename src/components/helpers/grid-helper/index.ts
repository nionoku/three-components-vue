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

const createGridHelper = (parameters: Partial<GridHelperConstructorParameters>) => {
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
      type: Object as PropType<Partial<GridHelperConstructorParameters>>,
      default: null,
    },
  },
  setup(props) {
    let gridHelper = createGridHelper(props.parameters);
    const { object3D } = useParentObject3D({ invalidTypeMessage: 'Mesh must be child of Object3D' });
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
    const positionWatcherCanceler = watch(() => props.position, applyPosition, {
      deep: true,
      immediate: true,
    });
    const rotationWatcherCanceler = watch(() => props.rotation, applyRotation, {
      deep: true,
      immediate: true,
    });
    const scaleWatcherCanceler = watch(() => props.scale, applyScale, {
      deep: true,
      immediate: true,
    });
    const lookAtWatcherCanceler = watch(() => props.lookAt, applyLookAt, {
      deep: true,
      immediate: true,
    });

    onBeforeUnmount(() => {
      positionWatcherCanceler();
      rotationWatcherCanceler();
      scaleWatcherCanceler();
      lookAtWatcherCanceler();

      gridHelper.removeFromParent();
    });
  },
});
