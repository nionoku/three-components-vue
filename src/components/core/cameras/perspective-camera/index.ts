import { CameraComponent } from '@/components/core/cameras/camera';
import { useInitEventEmits } from '@/composes/events/init';
import { useParentRenderer } from '@/composes/parent/renderer';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { useTransforms, useTransformsProps } from '@/composes/transform';
import { ResizeEmitter } from '@/utils/emitter';
import { assignUserData } from '@/utils/user-data';
import { PerspectiveCamera } from 'three';
import {
  defineComponent, onMounted, PropType, watch,
} from 'vue';

interface Props {
  paramaters?: Partial<Pick<PerspectiveCamera, 'fov' | 'near' | 'far' | 'name' | 'userData' | 'visible'>>
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
  emits: {
    ...useInitEventEmits<PerspectiveCamera>(),
  },
  setup(props, { emit, expose }) {
    const camera = new PerspectiveCamera(
      props.parameters?.fov,
      undefined,
      props.parameters?.near,
      props.parameters?.far,
    );
    // emit init action
    emit('init', camera);

    onMounted(() => {
      // emit mount action
      emit('mounted', camera);
    });

    // watch for parameters changed
    watch(() => props.parameters, (value) => {
      if (value?.fov) {
        camera.fov = value.fov;
      }

      if (value?.far) {
        camera.far = value.far;
      }

      if (value?.near) {
        camera.near = value.near;
      }

      if (value?.name) {
        camera.name = value.name;
      }

      if (typeof value?.visible === 'boolean') {
        camera.visible = value.visible;
      }

      if (value?.userData) {
        assignUserData(camera, value.userData);
      }

      camera.updateProjectionMatrix();
    }, { deep: true });

    const { renderer } = useParentRenderer(null, { invalidTypeMessage: 'PerspectiveCamera must be child of renderer' });
    renderer.setCamera(camera);

    // supports transforms
    const {
      applyPosition, applyRotation, applyLookAt,
    } = useTransforms(camera);
    watch(() => props.position, applyPosition, {
      deep: true,
      immediate: true,
    });
    watch(() => props.rotation, applyRotation, {
      deep: true,
      immediate: true,
    });
    watch(() => props.lookAt, applyLookAt, {
      deep: true,
      immediate: true,
    });
    // supports resize
    ResizeEmitter.addEventListener('resize', ({ rect }) => {
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
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
