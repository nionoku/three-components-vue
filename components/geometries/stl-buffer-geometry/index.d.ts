import { BufferGeometry as ThreeBufferGeometry, LoadingManager } from 'three';
import { Geometry } from '../geometry';
interface Props {
    path: string;
    manager: LoadingManager;
    whenLoad: (geometry: ThreeBufferGeometry) => void;
    whenProgress: (event: ProgressEvent<EventTarget>) => void;
    whenError: (error: ErrorEvent) => void;
}
interface PropsImpl extends Omit<Props, 'whenLoad' | 'whenProgress' | 'whenError'> {
    whenLoad: Props['whenLoad'] | null;
    whenProgress: Props['whenProgress'] | null;
    whenError: Props['whenError'] | null;
}
export declare type STLBufferGeometryComponent = Pick<ThreeBufferGeometry, 'isBufferGeometry'>;
export default class STLBufferGeometry extends Geometry<ThreeBufferGeometry, Partial<Props>> implements STLBufferGeometryComponent, PropsImpl {
    readonly path: PropsImpl['path'];
    readonly manager: PropsImpl['manager'];
    readonly whenLoad: PropsImpl['whenLoad'];
    readonly whenProgress: PropsImpl['whenProgress'];
    readonly whenError: PropsImpl['whenError'];
    readonly isBufferGeometry: STLBufferGeometryComponent['isBufferGeometry'];
    protected whenPathChanged(value: string): void;
    protected createTarget(path: string): Promise<ThreeBufferGeometry>;
    beforeDestroy(): void;
}
export {};
