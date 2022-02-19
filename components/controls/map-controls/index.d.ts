import { CameraComponent } from '@/components/cameras/camera';
import { Component } from '@/components/core/component';
import { RendererEvents } from '@/types/events/renderer';
import { MapControls as ThreeMapControls } from 'three/examples/jsm/controls/OrbitControls';
import { TinyEmitter } from 'tiny-emitter';
import { Camera } from 'three';
export default class MapControls extends Component<ThreeMapControls> {
    $parent: CameraComponent;
    protected $$emitter: TinyEmitter<keyof RendererEvents> | null;
    created(): void;
    beforeDestroy(): void;
    protected createTarget(camera: Camera, canvas: HTMLCanvasElement): ThreeMapControls;
}
