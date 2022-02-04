import { Prop } from 'vue-property-decorator';
import { TransformatableComponent } from '@/types/object3d';
import { Object3D, Vector3 } from 'three';
import { Component } from '../component';

export abstract class TransformatableComponentImpl<P> extends Component implements
    Partial<TransformatableComponent> {
  declare public $props: P & Partial<TransformatableComponent>

  @Prop({ type: Object, default: null })
  public readonly position: Nullishable<TransformatableComponent['position']>;

  @Prop({ type: Object, default: null })
  public readonly rotation: Nullishable<TransformatableComponent['rotation']>;

  @Prop({ type: Object, default: null })
  public readonly lookAt: Nullishable<TransformatableComponent['lookAt']>;

  @Prop({ type: Object, default: null })
  public readonly scale: Nullishable<TransformatableComponent['scale']>;

  protected applyTransforms(target: Object3D): void {
    if (this.position) {
      target.position.set(this.position.x, this.position.y, this.position.z);
    }

    if (this.rotation) {
      target.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }

    if (this.scale) {
      target.scale.set(this.scale.x, this.scale.y, this.scale.z);
    }

    if (this.lookAt) {
      target.lookAt(new Vector3(this.lookAt.x, this.lookAt.y, this.lookAt.z));
    }
  }
}
