import { ColorRepresentation, Light as ThreeLight, Object3D } from 'three';
import { ObjectComponent as ParentObjectComponent } from '@/types/object3d';
import { ObjectComponent } from '@/components/core/object';
interface LightHelperArguments {
    size: number;
    color: ColorRepresentation;
}
interface Props {
    helper?: boolean | LightHelperArguments;
}
export declare type LightComponent = Pick<ThreeLight, 'isLight'>;
declare type PropsImpl = Required<Props>;
export declare abstract class BaseLight<L extends ThreeLight, P = Record<string, unknown>> extends ObjectComponent<L, P & Props> implements PropsImpl, LightComponent {
    $parent: ParentObjectComponent;
    protected abstract createLightHelper(): Object3D;
    protected $$helper: Object3D | null;
    readonly helper: PropsImpl['helper'];
    readonly isLight: LightComponent['isLight'];
    beforeDestroy(): void;
    protected get helperArguments(): LightHelperArguments;
}
export {};
