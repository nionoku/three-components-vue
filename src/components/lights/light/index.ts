import { ColorRepresentation, Light as ThreeLight, Object3D } from 'three';
import { ObjectComponent as ParentObjectComponent } from '@/types/object3d';
import { ObjectComponent } from '@/components/super/object';
import { Prop } from 'vue-property-decorator';

interface LightHelperArguments {
  size: number,
  color: ColorRepresentation
}

interface Props {
  helper: boolean | LightHelperArguments
}

export type LightComponent = Pick<ThreeLight, 'isLight'>

type PropsImpl = Props

export abstract class BaseLight<L extends ThreeLight, P = Record<string, unknown>>
  extends ObjectComponent<L, P & Partial<Props>>
  implements PropsImpl, LightComponent {
  declare public $parent: ParentObjectComponent

  @Prop({ type: [Object, Boolean], default: false })
  public readonly helper!: PropsImpl['helper']

  protected $$helper: Object3D | null = null

  protected abstract createLightHelper(): Object3D

  public readonly isLight: LightComponent['isLight'] = true

  public created(): void {
    if (!this.$parent.isObject3D) {
      throw new Error('Light must be child of Object3D');
    }

    this.$$target = this.createTarget();
    this.applyTransforms();
    this.$parent.add(this.$$target);

    // add helper to parent
    if (this.helper) {
      this.$$helper = this.createLightHelper();
      this.$parent.add(this.$$helper);
    }
  }

  public beforeDestroy(): void {
    this.$$target?.removeFromParent();
    this.$$target?.dispose();
    this.$$helper?.removeFromParent();
  }

  protected get helperArguments(): LightHelperArguments {
    return typeof this.helper === 'object'
      ? this.helper
      : { size: 1, color: 'white' };
  }
}
