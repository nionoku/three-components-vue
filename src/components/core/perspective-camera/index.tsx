import { ComponentWithProps } from '@/types/component';
import {
  ComponentPublicInstance,
} from 'vue';
import { Options, Vue } from 'vue-class-component';
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';
import { Prop } from 'vue-property-decorator';
import { Vec3 } from '@/types/vector';
import { RendererComponent } from '../renderer';

export interface Props extends Pick<ThreePerspectiveCamera, 'aspect' | 'fov' | 'near' | 'far'> {
  rotation: Vec3
  lookAt: Vec3
}

export interface PerspectiveCameraComponent extends
  ComponentPublicInstance,
  Pick<ThreePerspectiveCamera, 'isPerspectiveCamera'>
{}

@Options({})
export default class PerspectiveCamera extends Vue implements
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

  @Prop({ type: Object, default: () => ({ x: 0, y: 0, z: 0 }) })
  public readonly rotation!: NonNullable<Props['rotation']>;

  @Prop({ type: Object, default: () => ({ x: 0, y: 0, z: 0 }) })
  public readonly lookAt!: NonNullable<Props['lookAt']>;

  public isPerspectiveCamera: PerspectiveCameraComponent['isPerspectiveCamera'] = true

  protected $$camera: ThreePerspectiveCamera | null = null

  public created(): void {
    if (!this.$parent.isRenderer) {
      throw new Error('PerspectiveCamera must be child of renderer');
    }

    this.$$camera = new ThreePerspectiveCamera(this.fov, this.aspect, this.near, this.far);
    this.$$camera.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.$$camera.lookAt(this.lookAt.x, this.lookAt.y, this.lookAt.z);

    this.$parent.setCamera(this.$$camera);
  }

  public beforeDestroy(): void {
    this.$$camera?.removeFromParent();
  }

  // TODO (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }
}
