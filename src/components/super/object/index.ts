// eslint-disable-next-line max-classes-per-file
import { Prop, Watch } from 'vue-property-decorator';
import { Object3D } from 'three';
import { Vec3 } from '@/types/vector';
import Emitter from 'tiny-emitter/instance';
import {
  Shadowable, SupportsPointerEvents, Transformatable,
} from '@/types/object3d';
import { MouseEventMap } from '@/types/events/mouse';
import { IntersectionEventHandler } from '@/types/events';
import { Component } from '../component';

interface Props extends
  Transformatable,
  Shadowable,
  SupportsPointerEvents
{}

interface PropsImpl extends
  Omit<Props, keyof Transformatable | keyof SupportsPointerEvents>,
  Nullable<Transformatable>,
  Nullable<SupportsPointerEvents>
{}

export abstract class ObjectComponent<T extends Object3D, P = Record<string, unknown>>
  extends Component<T, P & Partial<Props>>
  implements PropsImpl {
  @Prop({ type: Boolean, default: false })
  public readonly castShadow!: PropsImpl['castShadow'];

  @Prop({ type: Boolean, default: false })
  public readonly receiveShadow!: PropsImpl['receiveShadow'];

  @Prop({ type: Object, default: null })
  public readonly position!: PropsImpl['position'];

  @Prop({ type: Object, default: null })
  public readonly rotation!: PropsImpl['rotation'];

  @Prop({ type: Object, default: null })
  public readonly lookAt!: PropsImpl['lookAt'];

  @Prop({ type: Object, default: null })
  public readonly scale!: PropsImpl['scale'];

  @Prop({ type: Function, default: null })
  public readonly whenClick!: PropsImpl['whenClick'];

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

  public beforeDestroy(): void {
    this.$$target?.removeFromParent();
  }

  protected prepareTarget(): T {
    this.$$target = this.createTarget();

    this.applyTransforms();
    this.subscribeToEvents();

    return this.$$target;
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

  protected subscribeToEvents(): void {
    Emitter.on<MouseEventMap, IntersectionEventHandler>('click', (uuids, intersecteds) => {
      if (typeof this.whenClick === 'function') {
        this.whenClick(uuids, intersecteds);
      }
    });
  }
}
