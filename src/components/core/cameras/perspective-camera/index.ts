import { useParentRenderer } from '@/composes/parent-renderer';
import { PerspectiveCamera } from 'three';
import {
  defineComponent, onBeforeUnmount, PropType, watch,
} from 'vue';

interface Props {
  // TODO (2022.03.27): Remove aspect? or watch by resize canvas
  paramaters?: Partial<Pick<PerspectiveCamera, 'aspect' | 'fov' | 'near' | 'far'>>
}

export type PerspectiveCameraComponent = Pick<PerspectiveCamera, 'isPerspectiveCamera'>

export default defineComponent({
  props: {
    parameters: {
      type: Object as PropType<Props['paramaters']>,
      default: null,
    },
  },
  setup(props, { expose }) {
    const camera = new PerspectiveCamera(
      props.parameters?.fov,
      // props.parameters?.aspect,
      400 / 300,
      props.parameters?.near,
      props.parameters?.far,
    );
    camera.position.set(-2, -2, -2);
    camera.lookAt(0, 0, 0);
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

    onBeforeUnmount(() => {
      // cancel watch for parameters changed
      parametersWatcherCanceler();
    });

    const exposed: PerspectiveCameraComponent = {
      isPerspectiveCamera: true,
    };
    // expose public instances
    expose(exposed);
  },
  render() {
    return this.$slots?.default?.() || [];
  },
});
