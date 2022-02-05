import { Prop, Watch } from 'vue-property-decorator';
import { TransformatableComponent } from '@/types/object3d';
import { Object3D } from 'three';
import { Vec3 } from '@/types/vector';
import { Component } from '../component';

export abstract class TransformatableComponentImpl<P, T extends Object3D> extends Component
  implements Partial<TransformatableComponent> {
  declare public $props: P & Partial<TransformatableComponent>

  @Prop({ type: Object, default: null })
  public readonly position: Nullishable<TransformatableComponent['position']>;

  @Prop({ type: Object, default: null })
  public readonly rotation: Nullishable<TransformatableComponent['rotation']>;

  @Prop({ type: Object, default: null })
  public readonly lookAt: Nullishable<TransformatableComponent['lookAt']>;

  @Prop({ type: Object, default: null })
  public readonly scale: Nullishable<TransformatableComponent['scale']>;

  protected abstract $$target: T | null

  protected abstract createTarget<P extends Array<string> = []>(...args: P): T

  @Watch('rotation', { deep: true })
  protected whenRotation(value: Vec3): void {
    if (!this.$$target) {
      throw new Error('Can not apply rotation to target. Target is not ready');
    }

    this.$$target.rotation.set(value.x, value.y, value.z);
  }

  @Watch('position')
  protected whenTranslate(value: Vec3): void {
    if (!this.$$target) {
      throw new Error('Can not apply position to target. Target is not ready');
    }

    this.$$target.position.set(value.x, value.y, value.z);
  }

  @Watch('lookAt')
  protected whenLookAt(value: Vec3): void {
    if (!this.$$target) {
      throw new Error('Can not apply lookAt to target. Target is not ready');
    }

    this.$$target.lookAt(value.x, value.y, value.z);
  }

  @Watch('scale')
  protected whenScale(value: Vec3): void {
    if (!this.$$target) {
      throw new Error('Can not apply scale to target. Target is not ready');
    }

    this.$$target.scale.set(value.x, value.y, value.z);
  }

  protected applyTransforms(): void {
    if (this.position) {
      this.whenTranslate(this.position);
    }

    if (this.rotation) {
      this.whenRotation(this.rotation);
    }

    if (this.scale) {
      this.whenScale(this.scale);
    }

    if (this.lookAt) {
      this.whenLookAt(this.lookAt);
    }
  }
}
