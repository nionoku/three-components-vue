import { RendererComponent } from '@/components/core/renderer';
import {
  Color,
  Scene as ThreeScene,
} from 'three';
import { ComponentPublicInstance } from 'vue';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ObjectComponent } from '../object';

interface Props {
  background?: NonNullable<ThreeScene['background']> | string
}

type PropsImpl = Required<Props>

interface SceneComponent extends ComponentPublicInstance, Pick<ThreeScene, 'isScene'> {}

@Options({})
export default class Scene extends ObjectComponent<ThreeScene, Props>
  implements SceneComponent, PropsImpl {
  declare public $parent: RendererComponent

  public readonly isScene: SceneComponent['isScene'] = true

  @Prop({ type: [String, Object], default: 'white' })
  public readonly background!: PropsImpl['background'];

  public created(): void {
    if (!this.$parent.isRenderer) {
      throw new Error('Scene must be child of renderer');
    }

    this.$$target = this.createTarget();
    this.$parent.setScene(this.$$target);
  }

  public mounted(): void {
    this.$parent.startRendering();
  }

  public beforeUnmount(): void {
    this.$parent.cancelRendering();
    this.$$target?.removeFromParent();
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
