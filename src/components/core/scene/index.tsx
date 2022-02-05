import { TransformatableComponentImpl } from '@/components/super/object';
import { ObjectComponent } from '@/types/object3d';
import {
  Color,
  Scene as ThreeScene,
  Object3D,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { RendererComponent } from '../renderer';

export interface Props {
  background?: NonNullable<ThreeScene['background']> | string
}

export interface SceneComponent extends ObjectComponent, Pick<ThreeScene, 'isScene'> {}

@Options({})
export default class Scene extends TransformatableComponentImpl<Props, ThreeScene> implements
    Required<Props>,
    SceneComponent {
  declare public $parent: RendererComponent

  @Prop({ type: [String, Object], default: 'white' })
  public readonly background!: NonNullable<Props['background']>;

  public readonly isScene: SceneComponent['isScene'] = true;

  public readonly isObject3D: SceneComponent['isObject3D'] = true;

  public created(): void {
    if (!this.$parent.isRenderer) {
      throw new Error('Scene must be child of renderer');
    }

    this.$$target = this.createTarget();
    this.applyTransforms();
    this.$parent.setScene(this.$$target);
  }

  public mounted(): void {
    this.$parent.startRendering();
  }

  public beforeDestroy(): void {
    this.$$target?.removeFromParent();
  }

  public add(...objects: Array<Object3D>): ThreeScene {
    if (!this.$$target) {
      throw new Error('Can not add objects on scene. Scene is null');
    }

    this.$$target?.add(...objects);
    return this.$$target;
  }

  public remove(...objects: Array<Object3D>): ThreeScene {
    if (!this.$$target) {
      throw new Error('Can not remove objects from scene. Scene is null');
    }

    this.$$target?.remove(...objects);
    return this.$$target;
  }

  protected createTarget(): ThreeScene {
    const scene = new ThreeScene();

    if (typeof this.background === 'string') {
      scene.background = new Color(this.background);
    } else {
      scene.background = this.background;
    }

    return scene;
  }
}
