import { BufferGeometry as ThreeBufferGeometry } from 'three';
import { Geometry } from '../geometry';
export declare type BufferGeometryComponent = Pick<ThreeBufferGeometry, 'isBufferGeometry'>;
export default class BufferGeometry<P = Record<string, unknown>> extends Geometry<ThreeBufferGeometry, P> implements BufferGeometryComponent {
    readonly isBufferGeometry: BufferGeometryComponent['isBufferGeometry'];
    created(): void;
    protected createTarget(): ThreeBufferGeometry;
}
