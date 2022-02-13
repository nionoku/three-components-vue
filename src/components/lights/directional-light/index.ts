import {
  DirectionalLight as ThreeDirectionalLight,
  DirectionalLightHelper as ThreeDirectionalLightHelper,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BaseLight } from '../light';

// TODO (2022.02.05): Add target prop
type Props = Partial<Pick<ThreeDirectionalLight, 'color' | 'intensity'>>

export type DirectionalLightComponent = Pick<ThreeDirectionalLight, 'isDirectionalLight'>

type PropsImpl = Props

@Options({})
export default class DirectionalLight
  extends BaseLight<ThreeDirectionalLight, Partial<Props>>
  implements PropsImpl {
  @Prop({ type: [Object, Number, String], default: 'white' })
  public readonly color!: PropsImpl['color']

  @Prop({ type: Number, default: 1 })
  public readonly intensity!: PropsImpl['intensity']

  // TODO (2022.02.05): Impl target
  // @Prop({ type: Object, default: () => ({ x: 0, y: 0, z: 0 }) })
  // public readonly target!: NonNullable<Props['target']>

  public readonly isDirectionalLight: DirectionalLightComponent['isDirectionalLight'] = true

  public created(): void {
    if (!this.$parent.isObject3D) {
      throw new Error('DirectionalLight must be child of Object3D');
    }

    this.$$target = this.createTarget();
    this.$parent.add(this.$$target);

    // add helper to parent
    if (this.helper) {
      this.$$helper = this.createLightHelper();
      this.$parent.add(this.$$helper);
    }
  }

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
