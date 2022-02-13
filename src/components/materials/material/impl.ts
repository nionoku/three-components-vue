import {
  Material as ThreeMaterial,
} from 'three';
import { Options } from 'vue-class-component';
import { BaseMaterial } from '.';

@Options({})
export default class Material<P> extends BaseMaterial<ThreeMaterial, P> {
  public created(): void {
    if (!this.$parent.isMesh) {
      throw new Error('Material must be child of Mesh');
    }

    this.$$target = this.createTarget();
    this.$parent.setMaterial(this.$$target);
  }

  protected createTarget(): ThreeMaterial {
    const material = new ThreeMaterial();
    return material;
  }
}
