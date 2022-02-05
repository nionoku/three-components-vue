import {
  AmbientLight as ThreeAmbientLight, Object3D,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BaseLight } from '../light';

export type Props = Partial<Pick<ThreeAmbientLight, 'color' | 'intensity'>>

export type AmbientLightComponent = Pick<ThreeAmbientLight, 'isAmbientLight'>

@Options({})
export default class AmbientLight extends BaseLight<Props, ThreeAmbientLight> implements
    Required<Props>, AmbientLightComponent {
  @Prop({ type: [Object, Number, String], default: 'white' })
  public readonly color!: NonNullable<Props['color']>

  @Prop({ type: Number, default: 1 })
  public readonly intensity!: NonNullable<Props['intensity']>

  public readonly isAmbientLight: AmbientLightComponent['isAmbientLight'] = true

  protected createTarget(): ThreeAmbientLight {
    const light = new ThreeAmbientLight(this.color, this.intensity);
    return light;
  }

  protected createLightHelper(): Object3D {
    throw new Error('AmbientLight unsupport helpers');
  }
}
