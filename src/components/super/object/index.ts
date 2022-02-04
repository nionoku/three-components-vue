import { Prop } from 'vue-property-decorator';
import { TransformatableComponent } from '@/types/object3d';
import { Vue } from 'vue-class-component';
import { Object3D } from 'three';

export abstract class TransformatableComponentImpl extends Vue implements
    Partial<TransformatableComponent> {
  @Prop({ type: [Object, null], default: null })
  public readonly position: Nullishable<TransformatableComponent['position']>;

  @Prop({ type: [Object, null], default: null })
  public readonly rotation: Nullishable<TransformatableComponent['rotation']>;

  @Prop({ type: [Object, null], default: null })
  public readonly lookAt: Nullishable<TransformatableComponent['lookAt']>;

  @Prop({ type: [Object, null], default: null })
  public readonly scale: Nullishable<TransformatableComponent['scale']>;

  protected applyTransforms(target: Object3D): void {
    if (this.lookAt) {
      target.lookAt(this.lookAt.x, this.lookAt.y, this.lookAt.z);
    }

    if (this.scale) {
      target.scale.set(this.scale.x, this.scale.y, this.scale.z);
    }

    if (this.position) {
      target.position.set(this.position.x, this.position.y, this.position.z);
    }

    if (this.rotation) {
      target.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }
  }
}
