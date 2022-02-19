import { Component } from '@/components/core/component';
import { MeshComponent } from '@/components/meshes/mesh';
import { MaterialGroupItem } from '@/types/materials';
import { Material } from 'three';
import { ComponentPublicInstance } from 'vue';
export interface MaterialsGroupComponent extends ComponentPublicInstance {
    isMaterialsGroup: true;
    appendMaterial(material: Material, groups: MaterialGroupItem['groups']): void;
    removeMaterial(materialUUID: string): void;
}
export default class MaterialsGroup extends Component<Array<MaterialGroupItem>> implements MaterialsGroupComponent {
    $parent: MeshComponent;
    readonly isMaterialsGroup: MaterialsGroupComponent['isMaterialsGroup'];
    protected $$target: Array<MaterialGroupItem> | null;
    appendMaterial(material: Material, groups: MaterialGroupItem['groups']): void;
    removeMaterial(materialUUID: string): void;
    protected applyMaterials(): void;
    protected createTarget(): Array<MaterialGroupItem>;
}
