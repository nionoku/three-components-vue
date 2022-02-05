import { ComponentWithProps } from '@/types/component';
import {
  ComponentPublicInstance,
} from 'vue';
import { Options } from 'vue-class-component';
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import { Prop, Watch } from 'vue-property-decorator';
import { TransformatableComponentImpl } from '@/components/super/object';
import { Vec3 } from '@/types/vector';
import { RendererComponent } from '../renderer';

export type Props = Partial<Pick<ThreePerspectiveCamera, 'aspect' | 'fov' | 'near' | 'far'>>

export interface PerspectiveCameraComponent extends
  ComponentPublicInstance,
  Pick<ThreePerspectiveCamera, 'isPerspectiveCamera'>
{}

@Options({})
export default class PerspectiveCamera extends TransformatableComponentImpl<Props> implements
    ComponentWithProps<Props>,
    Required<Props>,
    PerspectiveCameraComponent {
  declare public $parent: RendererComponent

  @Prop({ type: Number, default: 1 })
  public readonly aspect!: NonNullable<Props['aspect']>;

  @Prop({ type: Number, default: 50 })
  public readonly fov!: NonNullable<Props['fov']>;

  @Prop({ type: Number, default: 0.1 })
  public readonly near!: NonNullable<Props['near']>;

  @Prop({ type: Number, default: 2000 })
  public readonly far!: NonNullable<Props['far']>;

  public isPerspectiveCamera: PerspectiveCameraComponent['isPerspectiveCamera'] = true

  /** @alias $$camera */
  protected $$target: ThreePerspectiveCamera | null = null

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

    this.$$target = this.createTarget();
    this.applyTransforms();
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
}
