import { useParentMesh } from '@/composes/parent-mesh';
import { Material } from 'three';
import { onBeforeUnmount } from 'vue';

export function useMaterial<M extends Material>(factory: () => M) {
  let material: M = factory();

  const { mesh: parent } = useParentMesh({ invalidTypeMessage: 'Material must be child of Mesh' });
  parent.setMaterial(material);

  onBeforeUnmount(() => {
    material.dispose();
  });

  return {
    material,
    materialParametersChangedCallback: () => {
      material.dispose();
      material = factory();

      parent.setMaterial(material);
    },
  };
}
