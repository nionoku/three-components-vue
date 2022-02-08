// eslint-disable-next-line max-classes-per-file
import { Prop, Watch } from 'vue-property-decorator';
import { Object3D } from 'three';
import {
  Shadowable, SupportsPointerEvents, Transformatable,
} from '@/types/object3d';
import { MouseEventMap } from '@/types/events/mouse';
import { IntersectionEventHandler, IntersectionGlobalEventHandler } from '@/types/events';
import { onBeforeUnmount } from 'vue';
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

  @Prop({ type: Function, default: null })
  public readonly whenDblClick!: PropsImpl['whenDblClick'];

  @Prop({ type: Function, default: null })
  public readonly whenMouseDown!: PropsImpl['whenMouseDown'];

  @Prop({ type: Function, default: null })
  public readonly whenMouseUp!: PropsImpl['whenMouseUp'];

  @Prop({ type: Function, default: null })
  public readonly whenMouseMove!: PropsImpl['whenMouseMove'];

  @Prop({ type: Function, default: null })
  public readonly whenWheel!: PropsImpl['whenWheel'];

  @Prop({ type: Function, default: null })
  public readonly whenClickGlobal!: PropsImpl['whenClickGlobal'];

  @Prop({ type: Function, default: null })
  public readonly whenDblClickGlobal!: PropsImpl['whenDblClickGlobal'];

  @Prop({ type: Function, default: null })
  public readonly whenMouseDownGlobal!: PropsImpl['whenMouseDownGlobal'];

  @Prop({ type: Function, default: null })
  public readonly whenMouseUpGlobal!: PropsImpl['whenMouseUpGlobal'];

  @Prop({ type: Function, default: null })
  public readonly whenMouseMoveGlobal!: PropsImpl['whenMouseMoveGlobal'];

  @Prop({ type: Function, default: null })
  public readonly whenWheelGlobal!: PropsImpl['whenWheelGlobal'];

  @Watch('rotation', { deep: true })
  protected whenRotation(value: Props['rotation']): void {
    if (!this.$$target) {
      throw new Error('Can not apply rotation to target. Target is not ready');
    }

    this.$$target.rotation.set(value.x, value.y, value.z);
  }

  @Watch('position')
  protected whenTranslate(value: Props['position']): void {
    if (!this.$$target) {
      throw new Error('Can not apply position to target. Target is not ready');
    }

    this.$$target.position.set(value.x, value.y, value.z);
  }

  @Watch('lookAt')
  protected whenLookAt(value: Props['lookAt']): void {
    if (!this.$$target) {
      throw new Error('Can not apply lookAt to target. Target is not ready');
    }

    this.$$target.lookAt(value.x, value.y, value.z);
  }

  @Watch('scale')
  protected whenScale(value: Props['scale']): void {
    if (!this.$$target) {
      throw new Error('Can not apply scale to target. Target is not ready');
    }

    this.$$target.scale.set(value.x, value.y, value.z);
  }

  @Watch('whenClick', { immediate: true })
  protected whenClickActionChanged(
    action: PropsImpl['whenClick'],
    prev: PropsImpl['whenClick'],
  ): void {
    this.subscribeToEvent('click', action, prev);
  }

  @Watch('whenDblClick', { immediate: true })
  protected whenDblClickActionChanged(
    action: PropsImpl['whenDblClick'],
    prev: PropsImpl['whenDblClick'],
  ): void {
    this.subscribeToEvent('dblclick', action, prev);
  }

  @Watch('whenMouseDown', { immediate: true })
  protected whenMouseDownActionChanged(
    action: PropsImpl['whenMouseDown'],
    prev: PropsImpl['whenMouseDown'],
  ): void {
    this.subscribeToEvent('mousedown', action, prev);
  }

  @Watch('whenMouseUp', { immediate: true })
  protected whenMouseUpActionChanged(
    action: PropsImpl['whenMouseUp'],
    prev: PropsImpl['whenMouseUp'],
  ): void {
    this.subscribeToEvent('mouseup', action, prev);
  }

  @Watch('whenMouseMove', { immediate: true })
  protected whenMouseMoveActionChanged(
    action: PropsImpl['whenMouseMove'],
    prev: PropsImpl['whenMouseMove'],
  ): void {
    this.subscribeToEvent('mousemove', action, prev);
  }

  @Watch('whenWheel', { immediate: true })
  protected whenMouseWheelActionChanged(
    action: PropsImpl['whenWheel'],
    prev: PropsImpl['whenWheel'],
  ): void {
    this.subscribeToEvent('wheel', action, prev);
  }

  @Watch('whenClickGlobal', { immediate: true })
  protected whenGlobalClickActionChanged(
    action: PropsImpl['whenClickGlobal'],
    prev: PropsImpl['whenClickGlobal'],
  ): void {
    this.subscribeToEvent('click', action, prev, true);
  }

  @Watch('whenDblClickGlobal', { immediate: true })
  protected whenGlobalDblClickActionChanged(
    action: PropsImpl['whenDblClickGlobal'],
    prev: PropsImpl['whenDblClickGlobal'],
  ): void {
    this.subscribeToEvent('dblclick', action, prev, true);
  }

  @Watch('whenMouseDownGlobal', { immediate: true })
  protected whenGlobalMouseDownActionChanged(
    action: PropsImpl['whenMouseDownGlobal'],
    prev: PropsImpl['whenMouseDownGlobal'],
  ): void {
    this.subscribeToEvent('mousedown', action, prev, true);
  }

  @Watch('whenMouseUpGlobal', { immediate: true })
  protected whenGlobalMouseUpActionChanged(
    action: PropsImpl['whenMouseUpGlobal'],
    prev: PropsImpl['whenMouseUpGlobal'],
  ): void {
    this.subscribeToEvent('mouseup', action, prev, true);
  }

  @Watch('whenMouseMoveGlobal', { immediate: true })
  protected whenGlobalMouseMoveActionChanged(
    action: PropsImpl['whenMouseMoveGlobal'],
    prev: PropsImpl['whenMouseMoveGlobal'],
  ): void {
    this.subscribeToEvent('mousemove', action, prev, true);
  }

  @Watch('whenWheelGlobal', { immediate: true })
  protected whenGlobalMouseWheelActionChanged(
    action: PropsImpl['whenWheelGlobal'],
    prev: PropsImpl['whenWheelGlobal'],
  ): void {
    this.subscribeToEvent('wheel', action, prev, true);
  }

  public beforeDestroy(): void {
    this.$$target?.removeFromParent();
  }

  protected prepareTarget(): T {
    this.$$target = this.createTarget();
    this.applyTransforms();

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

  private subscribeToEvent(
    event: MouseEventMap,
    action: IntersectionEventHandler | null,
    prevAction?: IntersectionEventHandler | null,
    // listen all event by type on canvas
    global = false,
  ): void {
    // disable previus action
    if (prevAction) {
      this.$$emitter?.off(event, prevAction);
    }

    const actionIsFunction = typeof action === 'function';

    if (actionIsFunction) {
      // disable listener before unmount
      onBeforeUnmount(() => this.$$emitter?.off(event, action));

      this.$$emitter?.on<MouseEventMap, IntersectionGlobalEventHandler>(
        event, (uuids, intersecteds) => {
          if (!actionIsFunction) {
            return undefined;
          }

          const intersectedTarget = this.target?.uuid === intersecteds[0].object.uuid
            ? intersecteds[0]
            : null;

          if (!global && intersectedTarget) {
            return action(uuids, intersecteds, intersectedTarget);
          }

          if (global) {
            return action(uuids, intersecteds, intersectedTarget);
          }

          return undefined;
        },
      );
    }
  }
}
