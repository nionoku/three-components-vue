import {
  ComponentPublicInstance,
} from 'vue';
import { Options } from 'vue-class-component';
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import { Prop, Watch } from 'vue-property-decorator';
import { ObjectComponent } from '@/components/super/object';
import { Vec3 } from '@/types/vector';
import { RendererComponent } from '../renderer';

type Props = Pick<ThreePerspectiveCamera, 'aspect' | 'fov' | 'near' | 'far'>

export interface PerspectiveCameraComponent extends
  ComponentPublicInstance,
  Pick<ThreePerspectiveCamera, 'isPerspectiveCamera'>
{}

type PropsImpl = Props

@Options({})
export default class PerspectiveCamera
  extends ObjectComponent<ThreePerspectiveCamera, Partial<Props>>
  implements PropsImpl, PerspectiveCameraComponent {
  declare public $parent: RendererComponent

  @Prop({ type: Number, default: 1 })
  public readonly aspect!: PropsImpl['aspect'];

  @Prop({ type: Number, default: 50 })
  public readonly fov!: PropsImpl['fov'];

  @Prop({ type: Number, default: 0.1 })
  public readonly near!: PropsImpl['near'];

  @Prop({ type: Number, default: 2000 })
  public readonly far!: PropsImpl['far'];

  public isPerspectiveCamera: PerspectiveCameraComponent['isPerspectiveCamera'] = true

  @Watch('position')
  protected whenPositionChanged(value: Vec3): void {
    if (!value) {
      throw new Error('Invalid position value');
    }

    this.$$target?.position.set(value.x, value.y, value.z);
    this.$$target?.updateProjectionMatrix();
  }

  public created(): void {
    if (!this.$parent.isRenderer) {
      throw new Error('PerspectiveCamera must be child of renderer');
    }

    this.$$target = this.prepareTarget();
    this.$$target.updateProjectionMatrix();
    this.$parent.setCamera(this.$$target);
  }

  public beforeDestroy(): void {
    this.$$target?.removeFromParent();
  }

  protected createTarget(): ThreePerspectiveCamera {
    const camera = new ThreePerspectiveCamera(this.fov, this.aspect, this.near, this.far);

    return camera;
  }

  protected subscribeToEvents(): void {
    // Camera can't supports click on itself
    return undefined;
  }
}
