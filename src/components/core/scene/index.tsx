import { ComponentWithProps } from '@/types/component';
import { InjectRenderer } from '@/types/renderer';
import { InjectScene } from '@/types/scene';
import {
  Color,
  Texture,
  Scene as ThreeScene,
} from 'three';
import { ComponentPublicInstance } from 'vue';
import { Options, Vue } from 'vue-class-component';
import { InjectReactive, Prop, ProvideReactive } from 'vue-property-decorator';
import { RendererComponent, RENDERER_KEY } from '../renderer';

export const SCENE_KEY = Symbol('scene');

export interface Props {
  background?: Color | Texture | string
}

export interface SceneComponent extends ComponentPublicInstance {
  isScene: boolean
}

@Options({})
export default class Scene extends Vue implements
      ComponentWithProps<Props>,
      SceneComponent,
      InjectRenderer,
      InjectScene {
  declare public $parent: RendererComponent

  declare public $props: Props

  @Prop({ type: [String, Object], default: 'white' })
  public readonly background!: NonNullable<Props['background']>;

  @InjectReactive(RENDERER_KEY)
  public renderer!: InjectRenderer['renderer']

  @ProvideReactive(SCENE_KEY)
  public scene: InjectScene['scene'] = null

  public isScene: SceneComponent['isScene'] = true;

  protected $$scene: ThreeScene | null = null

  public created(): void {
    this.$$scene = new ThreeScene();

    if (typeof this.background === 'string') {
      this.$$scene.background = new Color(this.background);
    } else {
      this.$$scene.background = this.background;
    }

    if (!this.$parent.isRenderer) {
      throw new Error('Scene must be child of renderer');
    }

    this.$parent.setScene(this.$$scene);
    this.$parent.startRendering();
  }

  // TODO (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }
}
