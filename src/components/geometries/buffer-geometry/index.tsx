import {
  BufferGeometry as ThreeBufferGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Geometry } from '../geometry';

export type BufferGeometryComponent = Pick<ThreeBufferGeometry, 'isBufferGeometry'>

@Options({})
export default class BufferGeometry<T = unknown> extends Geometry<T> implements
    BufferGeometryComponent {
  public readonly isBufferGeometry: BufferGeometryComponent['isBufferGeometry'] = true;

  protected createGeometry(): ThreeBufferGeometry {
    const geometry = new ThreeBufferGeometry();
    return geometry;
  }
}
