import { AmbientLight as ThreeAmbientLight, Object3D } from 'three';
import { BaseLight } from '../light';
interface Props {
    parameters?: Partial<Pick<ThreeAmbientLight, 'color' | 'intensity'>>;
}
export declare type AmbientLightComponent = Pick<ThreeAmbientLight, 'isAmbientLight'>;
interface PropsImpl extends Omit<Required<Props>, 'parameters'> {
    parameters: Props['parameters'] | null;
}
export default class AmbientLight extends BaseLight<ThreeAmbientLight, Props> implements PropsImpl, AmbientLightComponent {
    readonly parameters: PropsImpl['parameters'];
    readonly isAmbientLight: AmbientLightComponent['isAmbientLight'];
    created(): void;
    protected createTarget(): ThreeAmbientLight;
    protected createLightHelper(): Object3D;
}
export {};
