import {
  Light as ThreeLight,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BaseLight } from '.';

export interface Props extends Partial<Pick<ThreeLight, 'intensity'>> {
  hex?: number | string
}

@Options({})
export default class Light extends BaseLight<Props, ThreeLight> implements Required<Props> {
  @Prop({ type: [Number, String], default: 'white' })
  public readonly hex!: NonNullable<Props['hex']>

  @Prop({ type: Number, default: 1 })
  public readonly intensity!: NonNullable<Props['intensity']>

  protected createLight(): ThreeLight {
    const light = new ThreeLight(this.hex, this.intensity);
    return light;
  }
}
