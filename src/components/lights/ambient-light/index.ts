import {
  AmbientLight as ThreeAmbientLight,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BaseLight } from '../light';

export type Props = Partial<Pick<ThreeAmbientLight, 'color' | 'intensity'>>

@Options({})
export default class AmbientLight extends BaseLight<Props, ThreeAmbientLight> implements
    Required<Props> {
  @Prop({ type: [Object, Number, String], default: 'white' })
  public readonly color!: NonNullable<Props['color']>

  @Prop({ type: Number, default: 1 })
  public readonly intensity!: NonNullable<Props['intensity']>

  protected createTarget(): ThreeAmbientLight {
    const light = new ThreeAmbientLight(this.color, this.intensity);
    return light;
  }
}
