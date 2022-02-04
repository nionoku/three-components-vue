import {
  Material as ThreeMaterial,
} from 'three';
import { Options } from 'vue-class-component';
import { Material as BaseMaterial } from '.';

@Options({})
export default class Material extends BaseMaterial<never, ThreeMaterial> {
  protected createMaterial(): ThreeMaterial {
    const material = new ThreeMaterial();
    return material;
  }
}
