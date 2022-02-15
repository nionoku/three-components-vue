import { Component } from '@/components/core/component';
import { MeshComponent } from '@/components/meshes/mesh';
import { MaterialGroupItem } from '@/types/materials';
import {
  Material,
} from 'three';
import { ComponentPublicInstance } from 'vue';
import { Options } from 'vue-class-component';

export interface MaterialsGroupComponent extends ComponentPublicInstance {
  isMaterialsGroup: true
  appendMaterial(material: Material, groups: MaterialGroupItem['groups']): void
  removeMaterial(materialUUID: string): void
}

@Options({})
export default class MaterialsGroup
  extends Component<Array<MaterialGroupItem>>
  implements MaterialsGroupComponent {
  declare public $parent: MeshComponent

  public readonly isMaterialsGroup: MaterialsGroupComponent['isMaterialsGroup'] = true

  protected $$target: Array<MaterialGroupItem> | null = null;

  public appendMaterial(material: Material, groups: MaterialGroupItem['groups']): void {
    if (!this.$$target) {
      this.$$target = this.createTarget();
    }

    this.$$target.push({ material, groups });
    this.applyMaterials();
  }

  public removeMaterial(materialUUID: string): void {
    const removeMaterialIndex = this.$$target
      ?.findIndex(({ material }) => material.uuid === materialUUID);

    if (removeMaterialIndex && removeMaterialIndex > -1) {
      this.$$target?.splice(removeMaterialIndex, 1);
      this.applyMaterials();
    }
  }

  protected applyMaterials(): void {
    if (!this.$$target) {
      throw new Error('MaterialGroup is not ready so can not be added to Mesh');
    }

    // when all materials ready
    if (this.$$target.length >= (this.$slots.default?.().length || 0)) {
      const filtredMaterials = this.$$target.sort((it) => (!it.groups ? -1 : 1));
      this.$parent.setMaterialsByGroups(...filtredMaterials);
    }
  }

  protected createTarget(): Array<MaterialGroupItem> {
    const material: Array<MaterialGroupItem> = [];
    return material;
  }
}
