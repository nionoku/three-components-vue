import { Light as ThreeLight } from 'three';
import { ComponentWithProps } from '@/types/component';
import { Component } from '@/components/super/component';
import { ObjectComponent } from '@/types/object3d';

export type LightComponent = Pick<ThreeLight, 'isLight'>

export abstract class BaseLight<
    P = unknown, L extends ThreeLight = ThreeLight
> extends Component implements ComponentWithProps<P>, LightComponent {
  declare public $parent: ObjectComponent

  declare public $props: P

  public readonly isLight: LightComponent['isLight'] = true

  protected $$light: ThreeLight | null = null

  protected abstract createLight(): L

  public created(): void {
    if (!this.$parent.isObject3D) {
      throw new Error('Light must be child of Object3D');
    }

    this.$$light = this.createLight();
    this.$parent.add(this.$$light);
  }

  public beforeDestroy(): void {
    this.$$light?.dispose();
  }
}
