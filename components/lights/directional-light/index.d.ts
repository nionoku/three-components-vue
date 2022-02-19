import { DirectionalLight as ThreeDirectionalLight, DirectionalLightHelper as ThreeDirectionalLightHelper } from 'three';
import { BaseLight } from '../light';
interface Props {
    parameters?: Partial<Pick<ThreeDirectionalLight, 'color' | 'intensity'>>;
}
export declare type DirectionalLightComponent = Pick<ThreeDirectionalLight, 'isDirectionalLight'>;
interface PropsImpl extends Omit<Required<Props>, 'parameters'> {
    parameters: Props['parameters'] | null;
}
export default class DirectionalLight extends BaseLight<ThreeDirectionalLight, Props> implements PropsImpl {
    readonly parameters: PropsImpl['parameters'];
    readonly isDirectionalLight: DirectionalLightComponent['isDirectionalLight'];
    created(): void;
    protected createTarget(): ThreeDirectionalLight;
    protected createLightHelper(): ThreeDirectionalLightHelper;
}
export {};
