import { MeshComponent } from '@/components/meshes/mesh';
import { Material as ThreeMaterial, MaterialParameters } from 'three';
import { Component } from '@/components/core/component';
import { MaterialsGroupComponent } from '../../materials-group/group';
interface Props {
    groups?: Array<number>;
}
export declare type MaterialComponent = Pick<ThreeMaterial, 'isMaterial'>;
declare type PropsImpl = Required<Props>;
export declare abstract class BaseMaterial<M extends ThreeMaterial, P = Record<string, unknown>, PM = MaterialParameters> extends Component<M, P & Props> implements PropsImpl, MaterialComponent {
    $parent: MeshComponent & MaterialsGroupComponent;
    readonly isMaterial: MaterialComponent['isMaterial'];
    protected abstract readonly parameters: PM;
    protected abstract applyTarget(): void;
    protected whenParametersChanged(): void;
    /** Used only with MaterialsGroup */
    readonly groups: PropsImpl['groups'];
    beforeDestroy(): void;
    protected disposeMaterial(): void;
}
export {};
