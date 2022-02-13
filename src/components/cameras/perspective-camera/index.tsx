import {
  ComponentPublicInstance,
} from 'vue';
import { Options } from 'vue-class-component';
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import { Prop } from 'vue-property-decorator';
import Camera from '../camera';

type Props = Pick<ThreePerspectiveCamera, 'aspect' | 'fov' | 'near' | 'far'>

export interface PerspectiveCameraComponent extends
  ComponentPublicInstance,
  Pick<ThreePerspectiveCamera, 'isPerspectiveCamera'>
{}

type PropsImpl = Props

@Options({})
export default class PerspectiveCamera
  extends Camera<ThreePerspectiveCamera, Partial<Props>>
  implements PropsImpl, PerspectiveCameraComponent {
  @Prop({ type: Number, default: 1 })
  public readonly aspect!: PropsImpl['aspect'];

  @Prop({ type: Number, default: 50 })
  public readonly fov!: PropsImpl['fov'];

  @Prop({ type: Number, default: 0.1 })
  public readonly near!: PropsImpl['near'];

  @Prop({ type: Number, default: 2000 })
  public readonly far!: PropsImpl['far'];

  public isPerspectiveCamera: PerspectiveCameraComponent['isPerspectiveCamera'] = true

  protected createTarget(): ThreePerspectiveCamera {
    const camera = new ThreePerspectiveCamera(this.fov, this.aspect, this.near, this.far);
    return camera;
  }
}