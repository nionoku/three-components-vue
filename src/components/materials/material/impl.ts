import {
  Material as ThreeMaterial,
} from 'three';
import { Options } from 'vue-class-component';
import { BaseMaterial } from '.';

@Options({})
export default class Material<P> extends BaseMaterial<ThreeMaterial, P> {
  protected createTarget(): ThreeMaterial {
    const material = new ThreeMaterial();
    return material;
  }
}
