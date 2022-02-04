import { MeshComponent } from '@/components/meshes/mesh';
import { BufferGeometry } from 'three';
import { ComponentWithProps } from '@/types/component';
import { Component } from '@/components/super/component';

export interface GeometryComponent {
  isGeometry: BufferGeometry['isBufferGeometry']
}

export abstract class Geometry<P, G extends BufferGeometry> extends Component implements
    ComponentWithProps<P>,
    GeometryComponent {
  declare public $parent: MeshComponent

  declare public $props: P

  public readonly isGeometry: GeometryComponent['isGeometry'] = true

  protected $$geometry: BufferGeometry | null = null

  protected abstract createGeometry (): G

  public created(): void {
    if (!this.$parent.isMesh) {
      throw new Error('Geometry must be child of Mesh');
    }

    this.$$geometry = this.createGeometry();
    this.$parent.setGeometry(this.$$geometry);
  }

  public beforeDestroy(): void {
    this.$$geometry?.dispose();
  }
}
