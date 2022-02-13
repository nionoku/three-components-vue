import { CameraComponent } from '@/components/cameras/camera';
import { EMITTER_KEY } from '@/components/core/renderer';
import { Component } from '@/components/core/component';
import { RenderAction, RendererEventMap } from '@/types/events/renderer';
import { Camera } from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TinyEmitter } from 'tiny-emitter';
import { Options } from 'vue-class-component';
import { InjectReactive } from 'vue-property-decorator';

@Options({})
export default class OrbitControls extends Component<ThreeOrbitControls> {
  declare public $parent: CameraComponent

  @InjectReactive(EMITTER_KEY)
  protected $$emitter: TinyEmitter<keyof RendererEventMap> | null = null;

  public created(): void {
    if (!this.$parent.isCamera) {
      throw new Error('OrbitControls must be child of Camera');
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

  protected createTarget(camera: Camera, canvas: HTMLCanvasElement): ThreeOrbitControls {
    const controls = new ThreeOrbitControls(camera, canvas);
    return controls;
  }
}
