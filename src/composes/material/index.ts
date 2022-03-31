import { useParentMaterialGroup } from '@/composes/parent/material-group';
import { useParentMesh } from '@/composes/parent/mesh';
import { Material } from 'three';
import { ComponentInternalInstance, onBeforeUnmount } from 'vue';

export function useMaterial<M extends Material>(
  instance: ComponentInternalInstance | null,
  material: M,
) {
  try {
    const { mesh } = useParentMesh(instance, { invalidTypeMessage: 'Material must be child of Mesh' });
    mesh.setMaterial(material);
  // eslint-disable-next-line no-empty
  } catch (err) {}

  try {
    const { materialGroup } = useParentMaterialGroup(instance, { invalidTypeMessage: 'Material must be child of MaterialGroup' });
    materialGroup.addMaterial(material);
  // eslint-disable-next-line no-empty
  } catch (err) {}

  onBeforeUnmount(() => {
    material.dispose();
  });
}
