import { MaterialsGroupComponent } from '@/components/groups/materials-group';
import { MeshComponent } from '@/components/meshes/mesh';
import { useParentMaterialGroup } from '@/composes/parent/material-group';
import { useParentMesh } from '@/composes/parent/mesh';
import { Material } from 'three';
import { onBeforeUnmount } from 'vue';

type MaterialParametersChangedCallback = () => void

function useMesh(
  onInit: ((mesh: MeshComponent) => void),
  onParametersChanged: ((mesh: MeshComponent) => void),
): MaterialParametersChangedCallback {
  const { mesh } = useParentMesh({ invalidTypeMessage: 'Material must be child of Mesh' });
  onInit(mesh);

  return (() => {
    onParametersChanged(mesh);
  });
}

function useMaterialGroup(
  onInit: ((group: MaterialsGroupComponent) => void),
  onParametersChanged: ((group: MaterialsGroupComponent) => void),
): MaterialParametersChangedCallback {
  const { materialGroup } = useParentMaterialGroup({ invalidTypeMessage: 'Material must be child of MaterialGroup' });
  onInit(materialGroup);

  return (() => {
    onParametersChanged(materialGroup);
  });
}

export function useMaterial<M extends Material>(materialFactory: () => M) {
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