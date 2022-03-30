import { MaterialsGroupComponent } from '@/components/groups/materials-group';
import { MeshComponent } from '@/components/meshes/mesh';
import { useParentMaterialGroup } from '@/composes/parent/material-group';
import { useParentMesh } from '@/composes/parent/mesh';
import { Material } from 'three';
import { ComponentInternalInstance, onBeforeUnmount } from 'vue';

type MaterialParametersChangedCallback = () => void

function useMesh(
  onInit: ((mesh: MeshComponent) => void),
  onParametersChanged: ((mesh: MeshComponent) => void),
  instance: ComponentInternalInstance | null,
): MaterialParametersChangedCallback {
  const { mesh } = useParentMesh(instance, { invalidTypeMessage: 'Material must be child of Mesh' });
  onInit(mesh);

  return (() => {
    onParametersChanged(mesh);
  });
}

function useMaterialGroup(
  onInit: ((group: MaterialsGroupComponent) => void),
  onParametersChanged: ((group: MaterialsGroupComponent) => void),
  instance: ComponentInternalInstance | null,
): MaterialParametersChangedCallback {
  const { materialGroup } = useParentMaterialGroup(
    instance,
    { invalidTypeMessage: 'Material must be child of MaterialGroup' },
  );
  onInit(materialGroup);

  return (() => {
    onParametersChanged(materialGroup);
  });
}

export function useMaterial<M extends Material>(
  instance: ComponentInternalInstance | null,
  materialFactory: () => M,
) {
  let material = materialFactory();
  const usingMesh = (() => {
    try {
      return useMesh(
        (mesh) => mesh.setMaterial(material),
        (mesh) => {
          material.dispose();
          material = materialFactory();

          mesh.setMaterial(material);
        },
        instance,
      );
    } catch (err) {
      return null;
    }
  })();

  const usingMaterialGroup = (() => {
    try {
      return useMaterialGroup(
        (group) => group.addMaterial(material),
        (group) => {
          const newMaterial = materialFactory();

          group.addMaterial(newMaterial, material);
          material.dispose();
          material = newMaterial;
        },
        instance,
      );
    } catch (err) {
      return null;
    }
  })();

  const materialParametersChangedCallback = usingMesh || usingMaterialGroup;

  if (!materialParametersChangedCallback) {
    throw new Error('Material must be child of Mesh or MaterialsGroup');
  }

  onBeforeUnmount(() => {
    material.dispose();
  });

  return {
    material,
    materialParametersChangedCallback,
  };
}
