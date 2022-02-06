import {
  Light as ThreeLight, Object3D,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BaseLight } from '.';

interface Props extends Pick<ThreeLight, 'intensity'> {
  hex: number | string
}

type PropsImpl = Props

@Options({})
export default class Light
  extends BaseLight<ThreeLight, Partial<Props>>
  implements PropsImpl {
  @Prop({ type: [Number, String], default: 'white' })
  public readonly hex!: PropsImpl['hex']

  @Prop({ type: Number, default: 1 })
  public readonly intensity!: PropsImpl['intensity']

  protected createTarget(): ThreeLight {
    const light = new ThreeLight(this.hex, this.intensity);
    return light;
  }

  protected createLightHelper(): Object3D {
    throw new Error('Light unsupport helpers');
  }
}
