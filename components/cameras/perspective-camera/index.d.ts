import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import Camera from '../camera';
interface Props {
    parameters?: Partial<Pick<ThreePerspectiveCamera, 'aspect' | 'fov' | 'near' | 'far'>>;
}
export declare type PerspectiveCameraComponent = Pick<ThreePerspectiveCamera, 'isPerspectiveCamera'>;
interface PropsImpl extends Omit<Required<Props>, 'parameters'> {
    parameters: NonNullable<Props['parameters']> | null;
}
export default class PerspectiveCamera extends Camera<ThreePerspectiveCamera, Props> implements PropsImpl, PerspectiveCameraComponent {
    readonly parameters: PropsImpl['parameters'];
    isPerspectiveCamera: PerspectiveCameraComponent['isPerspectiveCamera'];
    protected whenParametersChanged(value: PropsImpl['parameters']): void;
    created(): void;
    protected createTarget(): ThreePerspectiveCamera;
}
export {};
