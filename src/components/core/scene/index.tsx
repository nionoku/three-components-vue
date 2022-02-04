import { ComponentWithProps } from '@/types/component';
import { ObjectContainer } from '@/types/object3d';
import {
  Color,
  Texture,
  Scene as ThreeScene,
  Object3D,
} from 'three';
import { ComponentPublicInstance } from 'vue';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { RendererComponent } from '../renderer';

export interface Props {
  background?: Color | Texture | string
}

export interface SceneComponent extends
    ComponentPublicInstance,
    ObjectContainer,
    Pick<ThreeScene, 'isScene'>
{}

@Options({})
export default class Scene extends Vue implements ComponentWithProps<Props>, SceneComponent {
  declare public $parent: RendererComponent

  declare public $props: Props

  @Prop({ type: [String, Object], default: 'white' })
  public readonly background!: NonNullable<Props['background']>;

  public readonly isScene: SceneComponent['isScene'] = true;

  protected $$scene: ThreeScene | null = null

  public created(): void {
    if (!this.$parent.isRenderer) {
      throw new Error('Scene must be child of renderer');
    }

    this.$$scene = new ThreeScene();

    if (typeof this.background === 'string') {
      this.$$scene.background = new Color(this.background);
    } else {
      this.$$scene.background = this.background;
    }

    this.$parent.setScene(this.$$scene);
  }

  public mounted(): void {
    this.$parent.startRendering();
  }

  // TODO (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }

  public add(...objects: Array<Object3D>): void {
    this.$$scene?.add(...objects);
  }

  public remove(...objects: Array<Object3D>): void {
    this.$$scene?.remove(...objects);
  }
}
