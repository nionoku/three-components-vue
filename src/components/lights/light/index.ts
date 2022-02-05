import { Light as ThreeLight } from 'three';
import { ComponentWithProps } from '@/types/component';
import { ObjectComponent } from '@/types/object3d';
import { TransformatableComponentImpl } from '@/components/super/object';

export type LightComponent = Pick<ThreeLight, 'isLight'>

export abstract class BaseLight<
    P = unknown, L extends ThreeLight = ThreeLight
> extends TransformatableComponentImpl<P, L> implements ComponentWithProps<P>, LightComponent {
  declare public $parent: ObjectComponent

  public readonly isLight: LightComponent['isLight'] = true

  /** @alias $$light */
  protected $$target: L | null = null

  public created(): void {
    if (!this.$parent.isObject3D) {
      throw new Error('Light must be child of Object3D');
    }

    this.$$target = this.createTarget();
    this.$parent.add(this.$$target);
  }

  public beforeDestroy(): void {
    this.$$target?.dispose();
  }
}
