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

  protected createTarget(): ThreeBufferGeometry {
    const geometry = new ThreeBufferGeometry();
    return geometry;
  }
}
