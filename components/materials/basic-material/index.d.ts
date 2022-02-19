import { MeshBasicMaterial, MeshBasicMaterialParameters } from 'three';
import { BaseMaterial } from '../material';
interface Props {
    parameters?: Omit<MeshBasicMaterialParameters, 'color'>;
    color?: MeshBasicMaterialParameters['color'];
}
declare type PropsImpl = Required<Props>;
export default class BasicMaterial extends BaseMaterial<MeshBasicMaterial, Props> implements PropsImpl {
    readonly parameters: PropsImpl['parameters'];
    readonly color: PropsImpl['color'];
    protected whenColorChanged(): void;
    created(): void;
    protected applyTarget(): void;
    protected createTarget(): MeshBasicMaterial;
}
export {};
