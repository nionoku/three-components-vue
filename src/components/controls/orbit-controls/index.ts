import { RendererComponent } from '@/components/core/renderer';
import { Component } from '@/components/super/component';
import { Camera } from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Options } from 'vue-class-component';

@Options({})
export default class OrbitControls extends Component<ThreeOrbitControls> {
  declare public $parent: RendererComponent

  public created(): void {
    if (!this.$parent.isRenderer) {
      throw new Error('OrbitControls must be child of renderer');
    }

    this.$parent.addOnBeforeRender((renderer, camera) => {
      if (!this.$$target) {
        this.$$target = this.createTarget(camera, renderer.domElement);
      }

      this.$$target.update();
    });
  }

  public beforeDestroy(): void {
    this.$$target?.dispose();
  }

  protected createTarget(camera: Camera, canvas: HTMLCanvasElement): ThreeOrbitControls {
    const controls = new ThreeOrbitControls(camera, canvas);
    return controls;
  }
}
