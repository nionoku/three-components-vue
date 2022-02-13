import { ColorRepresentation, Light as ThreeLight, Object3D } from 'three';
import { ObjectComponent as ParentObjectComponent } from '@/types/object3d';
import { Prop } from 'vue-property-decorator';
import { ObjectComponent } from '@/components/core/object';

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

  protected abstract createLightHelper(): Object3D

  protected $$helper: Object3D | null = null

  @Prop({ type: Boolean, default: false })
  public readonly helper!: PropsImpl['helper']

  public readonly isLight: LightComponent['isLight'] = true

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
