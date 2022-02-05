import {
  DirectionalLight as ThreeDirectionalLight,
  DirectionalLightHelper as ThreeDirectionalLightHelper,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BaseLight } from '../light';

// TODO (2022.02.05): Add target prop
export type Props = Partial<Pick<ThreeDirectionalLight, 'color' | 'intensity'>>

export type DirectionalLightComponent = Pick<ThreeDirectionalLight, 'isDirectionalLight'>

@Options({})
export default class DirectionalLight extends BaseLight<Props, ThreeDirectionalLight> implements
    Required<Props> {
  @Prop({ type: [Object, Number, String], default: 'white' })
  public readonly color!: NonNullable<Props['color']>

  @Prop({ type: Number, default: 1 })
  public readonly intensity!: NonNullable<Props['intensity']>

  // TODO (2022.02.05): Impl target
  // @Prop({ type: Object, default: () => ({ x: 0, y: 0, z: 0 }) })
  // public readonly target!: NonNullable<Props['target']>

  public readonly isDirectionalLight: DirectionalLightComponent['isDirectionalLight'] = true

  protected createTarget(): ThreeDirectionalLight {
    const light = new ThreeDirectionalLight(this.color, this.intensity);
    // TODO (2022.02.05): Impl target prop
    return light;
  }

  protected createLightHelper(): ThreeDirectionalLightHelper {
    if (!this.$$target) {
      throw new Error('Light Helper can not be created. Light is null');
    }

    const { color, size } = this.helperArguments;
    const helper = new ThreeDirectionalLightHelper(this.$$target, size, color);
    return helper;
  }
}
