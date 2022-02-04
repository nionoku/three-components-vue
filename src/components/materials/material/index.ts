import { MeshComponent } from '@/components/meshes/mesh';
import { Material as ThreeMaterial } from 'three';
import { ComponentWithProps } from '@/types/component';
import { Component } from '@/components/super/component';

export type MaterialComponent = Pick<ThreeMaterial, 'isMaterial'>

export abstract class Material<
    P = unknown, M extends ThreeMaterial = ThreeMaterial
> extends Component implements ComponentWithProps<P>, MaterialComponent {
  declare public $parent: MeshComponent

  declare public $props: P

  public readonly isMaterial: MaterialComponent['isMaterial'] = true

  protected $$material: ThreeMaterial | null = null

  protected abstract createMaterial(): M

  public created(): void {
    if (!this.$parent.isMesh) {
      throw new Error('Material must be child of Mesh');
    }

    this.$$material = this.createMaterial();
    this.$parent.setMaterial(this.$$material);
  }

  public beforeDestroy(): void {
    this.$$material?.dispose();
  }
}
