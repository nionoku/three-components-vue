import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { BufferGeometry, LoadingManager } from 'three';
import {
  defineComponent, getCurrentInstance, PropType,
} from 'vue';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useAsyncGeometry } from '@/composes/geometry/async';
import { useInitEventEmits } from '@/composes/events/init';

interface Props {
  path: string
  manager?: LoadingManager
}

interface Emits {
  load: (geometry: BufferGeometry) => void,
  progress: (event: ProgressEvent) => void,
  error: (event: ErrorEvent) => void,
}

function useStlLoaderEmits() {
  return {
    load: (geometry: BufferGeometry) => true,
    progress: (event: ProgressEvent) => true,
    error: (event: ErrorEvent) => true,
  };
}

export type StlGeometryComponent = Pick<BufferGeometry, 'isBufferGeometry'>

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    path: {
      type: String as PropType<string>,
      required: true,
    },
    manager: {
      type: Object as PropType<LoadingManager>,
      default: undefined,
    },
  },
  emits: {
    ...useStlLoaderEmits(),
    ...useInitEventEmits<BufferGeometry>(),
  },
  async setup(props, { emit, expose }) {
    try {
      const { setGeometry } = useAsyncGeometry(getCurrentInstance());
      const loader = new STLLoader(props.manager);
      const geometry = await loader.loadAsync(props.path, (event) => emit('progress', event));

      setGeometry(geometry);
      emit('load', geometry);
      emit('init', geometry);
    } catch (err) {
      emit('error', err as ErrorEvent);
    } finally {
      const exposed: StlGeometryComponent = {
        isBufferGeometry: true,
      };
      // expose public instances
      expose(exposed);
    }
  },
});
