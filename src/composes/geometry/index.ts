import { useParentMesh } from '@/composes/parent/mesh';
import { BufferGeometry } from 'three';
import { ComponentInternalInstance, onBeforeUnmount } from 'vue';

export function useGeometry<M extends BufferGeometry>(
  instance: ComponentInternalInstance | null,
  factory: () => M,
) {
  let geometry: M = factory();

  const { mesh } = useParentMesh(instance, { invalidTypeMessage: 'Geometry must be child of Mesh' });
  mesh.setGeometry(geometry);

  onBeforeUnmount(() => {
    geometry.dispose();
  });

  return {
    geometry,
    geometryParametersChangedCallback: () => {
      geometry.dispose();
      geometry = factory();

      mesh.setGeometry(geometry);
    },
  };
}
