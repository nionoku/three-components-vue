import { useParentMesh } from '@/composes/parent-mesh';
import { BufferGeometry } from 'three';
import { onBeforeUnmount } from 'vue';

export function useGeometry<M extends BufferGeometry>(factory: () => M) {
  let geometry: M = factory();

  const { mesh: parent } = useParentMesh({ invalidTypeMessage: 'Geometry must be child of Mesh' });
  parent.setGeometry(geometry);

  onBeforeUnmount(() => {
    geometry.dispose();
  });

  return {
    geometry,
    geometryParametersChangedCallback: () => {
      geometry.dispose();
      geometry = factory();

      parent.setGeometry(geometry);
    },
  };
}
