import { MeshComponent } from '@/components/meshes/mesh';
import { BufferGeometry } from 'three';
import { AsyncComponent } from '@/components/super/component/async';

export interface GeometryComponent {
  isGeometry: BufferGeometry['isBufferGeometry']
}

export abstract class AsyncGeometry<G extends BufferGeometry, P>
  extends AsyncComponent<G, P>
  implements GeometryComponent {
  declare public $parent: MeshComponent

  declare public $props: P

  public readonly isGeometry: GeometryComponent['isGeometry'] = true

  public created(): void {
    return undefined;
  }

  public beforeDestroy(): void {
    this.$$target?.dispose();
  }
}
