import { useParentMesh, useRenderWithDefaultSlot } from '@/composes';
import { Material } from 'three';
import { defineComponent } from 'vue';

export interface MaterialsGroupComponent {
  isMaterialsGroup: true
  addMaterial(material: Material, prevMaterial?: Material): void
  removeMaterial(material: Material): void
}

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  setup(props, { expose }) {
    const { mesh } = useParentMesh({ invalidTypeMessage: 'MaterialsGroup must be child of Mesh' });
    const materials: Array<Material> = [];

    const exposed: MaterialsGroupComponent = {
      isMaterialsGroup: true,
      addMaterial: (material, prevMaterial) => {
        const replacedMaterialIndex = materials.findIndex((it) => it.uuid === prevMaterial?.uuid);

        if (replacedMaterialIndex > -1) {
          materials.splice(replacedMaterialIndex, 1, material);
        } else {
          materials.push(material);
        }

        mesh.setMaterial(materials);
      },
      removeMaterial: (material) => {
        materials.splice(materials.findIndex((it) => it.uuid === material.uuid), 1);

        mesh.setMaterial(materials);
      },
    };
    // expose public instances
    expose(exposed);
  },
});
