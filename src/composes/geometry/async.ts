import { useParentMesh } from '@/composes/parent/mesh';
import { BufferGeometry } from 'three';
import { ComponentInternalInstance, onBeforeUnmount } from 'vue';

export function useAsyncGeometry<M extends BufferGeometry>(
  instance: ComponentInternalInstance | null,
) {
  let geometry: M;
  const { mesh } = useParentMesh(instance, { invalidTypeMessage: 'Geometry must be child of Mesh' });

  onBeforeUnmount(() => {
    geometry?.dispose();
  });

  return {
    setGeometry: (geom: M) => {
      geometry?.dispose();
      geometry = geom;

      mesh.setGeometry(geometry);
    },
  };
}
