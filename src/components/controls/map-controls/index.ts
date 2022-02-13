import { CameraComponent } from '@/components/cameras/camera';
import { EMITTER_KEY, RendererComponent } from '@/components/_core/renderer';
import { Component } from '@/components/super/component';
import { RenderAction, RendererEventMap } from '@/types/events/renderer';
import { Camera } from 'three';
import { MapControls as ThreeMapControls } from 'three/examples/jsm/controls/OrbitControls';
import { TinyEmitter } from 'tiny-emitter';
import { Options } from 'vue-class-component';
import { InjectReactive } from 'vue-property-decorator';

@Options({})
export default class MapControls extends Component<ThreeMapControls> {
  declare public $parent: CameraComponent

  @InjectReactive(EMITTER_KEY)
  protected $$emitter: TinyEmitter<keyof RendererEventMap> | null = null;

  public created(): void {
    if (!this.$parent.isCamera) {
      throw new Error('MapControls must be child of Camera');
    }

    this.$$emitter?.on<RenderAction>(
      'beforerender', (time, renderer, camera) => {
        if (!this.$$target) {
          this.$$target = this.createTarget(camera, renderer.domElement);
        }

        this.$$target.update();
      },
    );
  }

  public beforeDestroy(): void {
    this.$$target?.dispose();
  }

  protected createTarget(camera: Camera, canvas: HTMLCanvasElement): ThreeMapControls {
    const controls = new ThreeMapControls(camera, canvas);
    return controls;
  }
}
