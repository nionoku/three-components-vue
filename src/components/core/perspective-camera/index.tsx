import { ComponentWithProps } from '@/types/component';
import {
  ComponentPublicInstance,
} from 'vue';
import { Options } from 'vue-class-component';
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import { Prop } from 'vue-property-decorator';
import { TransformatableComponentImpl } from '@/components/super/object';
import { RendererComponent } from '../renderer';

export type Props = Pick<ThreePerspectiveCamera, 'aspect' | 'fov' | 'near' | 'far'>

export interface PerspectiveCameraComponent extends
  ComponentPublicInstance,
  Pick<ThreePerspectiveCamera, 'isPerspectiveCamera'>
{}

@Options({})
export default class PerspectiveCamera extends TransformatableComponentImpl implements
    ComponentWithProps<Props>,
    Props,
    PerspectiveCameraComponent {
  declare public $parent: RendererComponent

  declare public $props: Props

  @Prop({ type: Number, default: 1 })
  public readonly aspect!: NonNullable<Props['aspect']>;

  @Prop({ type: Number, default: 50 })
  public readonly fov!: NonNullable<Props['fov']>;

  @Prop({ type: Number, default: 0.1 })
  public readonly near!: NonNullable<Props['near']>;

  @Prop({ type: Number, default: 2000 })
  public readonly far!: NonNullable<Props['far']>;

  public isPerspectiveCamera: PerspectiveCameraComponent['isPerspectiveCamera'] = true

  protected $$camera: ThreePerspectiveCamera | null = null

  public created(): void {
    if (!this.$parent.isRenderer) {
      throw new Error('PerspectiveCamera must be child of renderer');
    }

    this.$$camera = this.createCamera();
    this.$parent.setCamera(this.$$camera);
  }

  public beforeDestroy(): void {
    this.$$camera?.removeFromParent();
  }

  // FIXME (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }

  protected createCamera(): ThreePerspectiveCamera {
    const camera = new ThreePerspectiveCamera(this.fov, this.aspect, this.near, this.far);
    this.applyTransforms(camera);

    return camera;
  }
}
