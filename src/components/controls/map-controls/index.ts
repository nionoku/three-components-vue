import { RendererComponent } from '@/components/core/renderer';
import { Component } from '@/components/super/component';
import { Camera } from 'three';
import { MapControls as ThreeMapControls } from 'three/examples/jsm/controls/OrbitControls';
import { Options } from 'vue-class-component';

@Options({})
export default class MapControls extends Component<ThreeMapControls> {
  declare public $parent: RendererComponent

  public created(): void {
    if (!this.$parent.isRenderer) {
      throw new Error('MapControls must be child of renderer');
    }

    this.$parent.addOnBeforeRender((time, renderer, camera) => {
      if (!this.$$target) {
        this.$$target = this.createTarget(camera, renderer.domElement);
      }

      this.$$target.update();
    });
  }

  public beforeDestroy(): void {
    this.$$target?.dispose();
  }

  protected createTarget(camera: Camera, canvas: HTMLCanvasElement): ThreeMapControls {
    const controls = new ThreeMapControls(camera, canvas);
    return controls;
  }
}
