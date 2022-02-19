import { MeshComponent } from '@/components/meshes/mesh';
import { BufferGeometry } from 'three';
import { Component } from '@/components/core/component';
export interface GeometryComponent {
    isGeometry: BufferGeometry['isBufferGeometry'];
}
export declare abstract class Geometry<G extends BufferGeometry, P> extends Component<G, P> implements GeometryComponent {
    $parent: MeshComponent;
    $props: P;
    readonly isGeometry: GeometryComponent['isGeometry'];
    beforeDestroy(): void;
}
