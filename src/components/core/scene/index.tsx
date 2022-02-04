import { TransformatableComponentImpl } from '@/components/super/object';
import { ComponentWithProps } from '@/types/component';
import { ObjectComponent } from '@/types/object3d';
import {
  Color,
  Scene as ThreeScene,
  Object3D,
} from 'three';
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { RendererComponent } from '../renderer';

export interface Props {
  background?: NonNullable<ThreeScene['background']> | string
}

export interface SceneComponent extends ObjectComponent, Pick<ThreeScene, 'isScene'> {}

@Options({})
export default class Scene extends TransformatableComponentImpl implements
    ComponentWithProps<Props>,
    Props,
    SceneComponent {
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

    this.$$scene = this.createScene();
    this.$parent.setScene(this.$$scene);
  }

  public mounted(): void {
    this.$parent.startRendering();
  }

  public beforeDestroy(): void {
    this.$$scene?.removeFromParent();
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

  protected createScene(): ThreeScene {
    const scene = new ThreeScene();

    if (typeof this.background === 'string') {
      scene.background = new Color(this.background);
    } else {
      scene.background = this.background;
    }
    this.applyTransforms(scene);

    return scene;
  }
}
