import {
  BufferGeometry as ThreeBufferGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Geometry } from '../geometry';

export type BufferGeometryComponent = Pick<ThreeBufferGeometry, 'isBufferGeometry'>

@Options({})
export default class BufferGeometry<P = Record<string, unknown>>
  extends Geometry<ThreeBufferGeometry, P>
  implements BufferGeometryComponent {
  public readonly isBufferGeometry: BufferGeometryComponent['isBufferGeometry'] = true;

  public created(): void {
    if (!this.$parent.isMesh) {
      throw new Error('Buffer geometry must be child of Mesh');
    }

    this.$$target = this.createTarget();
    this.$parent.setGeometry(this.$$target);
  }

  protected createTarget(): ThreeBufferGeometry {
    const geometry = new ThreeBufferGeometry();
    return geometry;
  }
}
