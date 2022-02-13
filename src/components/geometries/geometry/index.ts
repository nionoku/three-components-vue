import { MeshComponent } from '@/components/meshes/mesh';
import { BufferGeometry } from 'three';
import { Component } from '@/components/core/component';

export interface GeometryComponent {
  isGeometry: BufferGeometry['isBufferGeometry']
}

export abstract class Geometry<G extends BufferGeometry, P>
  extends Component<G, P>
  implements GeometryComponent {
  declare public $parent: MeshComponent

  declare public $props: P

  public readonly isGeometry: GeometryComponent['isGeometry'] = true

  public beforeDestroy(): void {
    this.$$target?.dispose();
  }
}
