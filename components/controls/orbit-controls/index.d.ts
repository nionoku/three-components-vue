import { CameraComponent } from '@/components/cameras/camera';
import { Component } from '@/components/core/component';
import { RendererEvents } from '@/types/events/renderer';
import { Camera } from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TinyEmitter } from 'tiny-emitter';
export default class OrbitControls extends Component<ThreeOrbitControls> {
    $parent: CameraComponent;
    protected $$emitter: TinyEmitter<keyof RendererEvents> | null;
    created(): void;
    beforeDestroy(): void;
    protected createTarget(camera: Camera, canvas: HTMLCanvasElement): ThreeOrbitControls;
}
