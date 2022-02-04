import { ComponentWithProps } from '@/types/component';
import {
  ComponentPublicInstance,
} from 'vue';
import { Options, Vue } from 'vue-class-component';
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import { Prop } from 'vue-property-decorator';
import { RendererComponent } from '../renderer';

export interface Props {
   /** [aspect=1] Camera frustum aspect ratio. Default value is 1. */
   aspect?: number
   /** [fov=50] Camera frustum vertical field of view. Default value is 50. */
   fov?: number
   /** [near=0.1] Camera frustum near plane. Default value is 0.1. */
   near?: number
   /** [far=2000] Camera frustum far plane. Default value is 2000. */
   far?: number
}

export interface PerspectiveCameraComponent extends ComponentPublicInstance {
  isPerspectiveCamera: boolean
}

@Options({})
export default class PerspectiveCamera extends Vue implements
    ComponentWithProps<Props>,
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

    this.$$camera = new ThreePerspectiveCamera(this.fov, this.aspect, this.near, this.far);

    this.$parent.setCamera(this.$$camera);
  }

  // TODO (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }
}
