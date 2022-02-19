import { BufferGeometry, Material, Mesh as ThreeMesh } from 'three';
import { ComponentPublicInstance } from 'vue';
import { ObjectComponent as ParentObjectComponent } from '@/types/object3d';
import { ObjectComponent } from '@/components/core/object';
import { MaterialGroupItem } from '@/types/materials';
export interface MeshComponent extends ComponentPublicInstance, Pick<ThreeMesh, 'isMesh'> {
    setGeometry(geometry: BufferGeometry): void;
    setMaterial(material: Material): void;
    setMaterialsByGroups(...materials: Array<MaterialGroupItem>): void;
}
export default class Mesh extends ObjectComponent<ThreeMesh> implements MeshComponent {
    $parent: ParentObjectComponent;
    readonly isMesh = true;
    created(): void;
    beforeDestroy(): void;
    setGeometry(geometry: BufferGeometry): void;
    setMaterial(material: Material): void;
    setMaterialsByGroups(...materials: Array<MaterialGroupItem>): void;
    protected applyMaterialsByGroups(groups: Array<MaterialGroupItem['groups']>): void;
    protected createTarget(): ThreeMesh;
}
