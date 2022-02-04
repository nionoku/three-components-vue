import { ComponentWithProps } from '@/types/component';
import { ObjectComponent } from '@/types/object3d';
import {
  Color,
  Texture,
  Scene as ThreeScene,
  Object3D,
} from 'three';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { RendererComponent } from '../renderer';

export interface Props {
  background?: Color | Texture | string
}

export interface SceneComponent extends ObjectComponent, Pick<ThreeScene, 'isScene'> {}

@Options({})
export default class Scene extends Vue implements ComponentWithProps<Props>, SceneComponent {
  declare public $parent: RendererComponent

  declare public $props: Props

  @Prop({ type: [String, Object], default: 'white' })
  public readonly background!: NonNullable<Props['background']>;

  public readonly isScene: SceneComponent['isScene'] = true;

  public readonly isObject3D: SceneComponent['isObject3D'] = true;

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

  public add(...objects: Array<Object3D>): ThreeScene {
    if (!this.$$scene) {
      throw new Error('Can not add objects on scene. Scene is null');
    }

    this.$$scene?.add(...objects);
    return this.$$scene;
  }

  public remove(...objects: Array<Object3D>): ThreeScene {
    if (!this.$$scene) {
      throw new Error('Can not remove objects from scene. Scene is null');
    }

    this.$$scene?.remove(...objects);
    return this.$$scene;
  }
}
