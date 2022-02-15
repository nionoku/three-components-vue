import { Options } from 'vue-class-component';
import {
  BufferGeometry, Material, Mesh as ThreeMesh,
} from 'three';
import { ComponentPublicInstance } from 'vue';
import { ObjectComponent as ParentObjectComponent } from '@/types/object3d';
import { ObjectComponent } from '@/components/core/object';
import { MaterialGroupItem } from '@/types/materials';

export interface MeshComponent extends ComponentPublicInstance, Pick<ThreeMesh, 'isMesh'> {
  setGeometry(geometry: BufferGeometry): void
  setMaterial(material: Material): void
  setMaterialsByGroups(...materials: Array<MaterialGroupItem>): void
}

@Options({})
export default class Mesh extends ObjectComponent<ThreeMesh> implements MeshComponent {
  declare public $parent: ParentObjectComponent

  public readonly isMesh = true

  public created(): void {
    if (!this.$parent.isObject3D) {
      throw new Error('Mesh must be child of Object3D');
    }

    this.$$target = this.createTarget();
    this.$parent.add(this.$$target);
  }

  public beforeDestroy(): void {
    this.$$target?.removeFromParent();
  }

  public setGeometry(geometry: BufferGeometry): void {
    if (!this.$$target) {
      throw new Error('Mesh is not ready so geometry can not be added to it');
    }

    this.$$target.geometry = geometry;

    if (this.$$target.geometry && this.$$target.userData.materialByGroups) {
      this.applyMaterialsByGroups(this.$$target.userData.materialByGroups);
    }
  }

  public setMaterial(material: Material): void {
    if (!this.$$target) {
      throw new Error('Mesh is not ready so material can not be added to it');
    }

    this.$$target.material = material;
  }

  public setMaterialsByGroups(...materials: Array<MaterialGroupItem>): void {
    if (!this.$$target) {
      throw new Error('Mesh is not ready so materials can not be added to it');
    }

    this.$$target.material = materials.map((it) => it.material);
    this.$$target.userData
      .materialByGroups = materials.map((it) => it.groups);

    if (this.$$target.geometry && this.$$target.userData.materialByGroups) {
      this.applyMaterialsByGroups(this.$$target.userData.materialByGroups);
    }
  }

  protected applyMaterialsByGroups(groups: Array<MaterialGroupItem['groups']>): void {
    if (!this.$$target) {
      throw new Error('Mesh is not ready so materials can not be configured');
    }

    // if figure not including groups - use only first material
    if (this.$$target.geometry.groups.length === 0 && Array.isArray(this.$$target.material)) {
      // eslint-disable-next-line prefer-destructuring
      this.$$target.material = this.$$target.material[0];
      return;
    }

    // apply material for each group
    groups.forEach((group, index) => {
      if (!this.$$target) {
        throw new Error('Mesh is not ready so materials can not be configured');
      }

      if (!group) {
        this.$$target.geometry.groups
          // eslint-disable-next-line no-param-reassign
          .forEach((it) => { it.materialIndex = index; });
      }

      if (Array.isArray(group)) {
        group.forEach((groupIndex) => {
          if (!this.$$target) {
            throw new Error('Mesh is not ready so materials can not be configured');
          }

          this.$$target.geometry.groups[groupIndex]
            .materialIndex = index;
        });
      }
    });
  }

  protected createTarget(): ThreeMesh {
    const mesh = new ThreeMesh();
    return mesh;
  }
}
