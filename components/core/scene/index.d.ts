import { RendererComponent } from '@/components/core/renderer';
import { Scene as ThreeScene } from 'three';
import { ComponentPublicInstance } from 'vue';
import { ObjectComponent } from '../object';
interface Props {
    parameters?: {
        background?: NonNullable<ThreeScene['background']> | string;
    };
}
interface PropsImpl extends Omit<Required<Props>, 'parameters'> {
    parameters: Props['parameters'] | null;
}
interface SceneComponent extends ComponentPublicInstance, Pick<ThreeScene, 'isScene'> {
}
export default class Scene extends ObjectComponent<ThreeScene, Props> implements SceneComponent, PropsImpl {
    $parent: RendererComponent;
    readonly isScene: SceneComponent['isScene'];
    readonly parameters: PropsImpl['parameters'];
    created(): void;
    mounted(): void;
    beforeUnmount(): void;
    protected createTarget(): ThreeScene;
    protected get background(): NonNullable<ThreeScene['background']> | string;
}
export {};
