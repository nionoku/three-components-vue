import { CameraComponent } from '@/components/core/cameras/camera';
import {
  useParentRenderer, useRenderWithDefaultSlot, useTransforms, useTransformsProps,
} from '@/composes';
import { PerspectiveCamera } from 'three';
import {
  defineComponent, onBeforeUnmount, PropType, watch,
} from 'vue';

interface Props {
  // TODO (2022.03.27): Remove aspect? or watch by resize canvas
  paramaters?: Partial<Pick<PerspectiveCamera, 'aspect' | 'fov' | 'near' | 'far'>>
}

export type PerspectiveCameraComponent = CameraComponent & Pick<PerspectiveCamera, 'isPerspectiveCamera'>

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    ...useTransformsProps,
    parameters: {
      type: Object as PropType<Props['paramaters']>,
      default: null,
    },
  },
  setup(props, { expose }) {
    const camera = new PerspectiveCamera(
      props.parameters?.fov,
      props.parameters?.aspect,
      props.parameters?.near,
      props.parameters?.far,
    );
    // watch for parameters changed
    const parametersWatcherCanceler = watch(
      () => props.parameters,
      (value) => {
        if (value?.aspect) {
          camera.aspect = value.aspect;
        }

        if (value?.fov) {
          camera.fov = value.fov;
        }

        if (value?.far) {
          camera.far = value.far;
        }

        if (value?.near) {
          camera.near = value.near;
        }

        camera.updateProjectionMatrix();
      },
      { deep: true },
    );

    const { renderer } = useParentRenderer({ invalidTypeMessage: 'PerspectiveCamera must be child of renderer' });
    renderer.setCamera(camera);

    // supports transforms
    const {
      applyPosition, applyRotation, applyLookAt,
    } = useTransforms(camera);
    const positionWatcherCanceler = watch(() => props.position, applyPosition, {
      deep: true,
      immediate: true,
    });
    const rotationWatcherCanceler = watch(() => props.rotation, applyRotation, {
      deep: true,
      immediate: true,
    });
    const lookAtWatcherCanceler = watch(() => props.lookAt, applyLookAt, {
      deep: true,
      immediate: true,
    });

    onBeforeUnmount(() => {
      // cancel watch for parameters changed
      parametersWatcherCanceler();

      positionWatcherCanceler();
      rotationWatcherCanceler();
      lookAtWatcherCanceler();
    });

    const exposed: PerspectiveCameraComponent = {
      isCamera: true,
      isPerspectiveCamera: true,
      camera,
    };
    // expose public instances
    expose(exposed);
  },
});
