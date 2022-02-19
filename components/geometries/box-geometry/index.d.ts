import { BoxGeometry as ThreeBoxGeometry } from 'three';
import BufferGeometry from '../buffer-geometry';
interface Props {
    parameters?: ThreeBoxGeometry['parameters'];
}
declare type PropsImpl = Required<Props>;
export default class BoxGeometry extends BufferGeometry<Props> implements PropsImpl {
    readonly parameters: PropsImpl['parameters'];
    created(): void;
    protected createTarget(): ThreeBoxGeometry;
}
export {};
