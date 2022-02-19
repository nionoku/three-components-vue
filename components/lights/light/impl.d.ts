import { Light as ThreeLight, Object3D } from 'three';
import { BaseLight } from '.';
interface Props {
    parameters?: Partial<{
        intensity: ThreeLight['intensity'];
        hex: number | string;
    }>;
}
interface PropsImpl extends Omit<Required<Props>, 'parameters'> {
    parameters: NonNullable<Props['parameters']> | null;
}
export default class Light extends BaseLight<ThreeLight, Props> implements PropsImpl {
    readonly parameters: PropsImpl['parameters'];
    protected createTarget(): ThreeLight;
    protected createLightHelper(): Object3D;
}
export {};
