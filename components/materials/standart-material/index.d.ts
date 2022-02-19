import { MeshStandardMaterial, MeshStandardMaterialParameters } from 'three';
import { BaseMaterial } from '../material';
interface Props {
    parameters?: Omit<MeshStandardMaterialParameters, 'color'>;
    color?: MeshStandardMaterialParameters['color'];
}
declare type PropsImpl = Required<Props>;
export default class StandartMaterial extends BaseMaterial<MeshStandardMaterial, Props> implements PropsImpl {
    readonly parameters: PropsImpl['parameters'];
    readonly color: PropsImpl['color'];
    protected whenColorChanged(): void;
    created(): void;
    protected applyTarget(): void;
    protected createTarget(): MeshStandardMaterial;
}
export {};
