import { MeshComponent } from '@/components/meshes/mesh';
import { BufferGeometry } from 'three';
import { Component } from '@/components/super/component';

export interface GeometryComponent {
  isGeometry: BufferGeometry['isBufferGeometry']
}

export abstract class Geometry<P, G extends BufferGeometry> extends Component<P, G> implements
    GeometryComponent {
  declare public $parent: MeshComponent

  declare public $props: P

  public readonly isGeometry: GeometryComponent['isGeometry'] = true

  public created(): void {
    if (!this.$parent.isMesh) {
      throw new Error('Geometry must be child of Mesh');
    }

    this.$$target = this.createTarget();
    this.$parent.setGeometry(this.$$target);
  }

  public beforeDestroy(): void {
    this.$$target?.dispose();
  }
}
