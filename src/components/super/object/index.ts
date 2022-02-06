// eslint-disable-next-line max-classes-per-file
import { Prop, Watch } from 'vue-property-decorator';
import { Object3D } from 'three';
import { Vec3 } from '@/types/vector';
import { TinyEmitter } from 'tiny-emitter';
import { Transformatable } from '@/types/object3d';
import { Component } from '../component';

type TransformatableInterface = Nullable<Required<Transformatable>>

export abstract class ObjectComponent<P, T extends Object3D>
  extends Component<P & Transformatable, T>
  implements TransformatableInterface {
  protected $$emitter = new TinyEmitter()

  @Prop({ type: Object, default: null })
  public readonly position!: TransformatableInterface['position'];

  @Prop({ type: Object, default: null })
  public readonly rotation!: TransformatableInterface['rotation'];

  @Prop({ type: Object, default: null })
  public readonly lookAt!: TransformatableInterface['lookAt'];

  @Prop({ type: Object, default: null })
  public readonly scale!: TransformatableInterface['scale'];

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
