import { ComponentEvents } from '@/types/events';
import { IntersectionEventHandler, IntersectionGlobalEventHandler } from '@/types/events/intersection';
import { PointerEventMap } from '@/types/events/pointer';
import { Euler, Object3D, Vector3 } from 'three';
import { TinyEmitter } from 'tiny-emitter';
import { nextTick, onUnmounted } from 'vue';
import { InjectReactive, Prop, Watch } from 'vue-property-decorator';
import { Component } from '../component';
import { EMITTER_KEY } from '../renderer';
import { Shadowable } from './_shadowable';
import { SupportsPointerEvents } from './_supportsPointerEvents';
import { Transformable } from './_transformable';

interface Props extends
  Partial<Transformable>,
  Partial<Shadowable>,
  Partial<SupportsPointerEvents>
{}

interface PropsImpl extends
  Omit<Required<Props>, keyof Transformable | keyof SupportsPointerEvents>,
  Nullable<Transformable>,
  Nullable<SupportsPointerEvents>
{}

type IObjectComponent = Pick<Object3D, 'isObject3D' | 'add' | 'remove'>

export abstract class ObjectComponent<T extends Object3D, P = Record<string, unknown>>
  extends Component<T, P & Props>
  implements IObjectComponent, PropsImpl {
  public readonly isObject3D: IObjectComponent['isObject3D'] = true;

  @Prop({ type: Boolean, default: false })
  public readonly castShadow!: PropsImpl['castShadow'];

  @Prop({ type: Boolean, default: false })
  public readonly receiveShadow!: PropsImpl['receiveShadow'];

  @Prop({ type: Object, default: null })
  public readonly position!: PropsImpl['position'];

  @Prop({ type: Object, default: null })
  public readonly rotate!: PropsImpl['rotate'];

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

  @InjectReactive(EMITTER_KEY)
  protected $$emitter: TinyEmitter<ComponentEvents> | null = null;

  @Watch('rotate', { deep: true, immediate: true })
  protected whenRotate(value: PropsImpl['rotate']): void {
    nextTick(() => {
      const eulurValue = (() => {
        if (typeof value === 'number') { return new Euler(value, value, value); }

        return new Euler(
          value?.x ?? this.$$target?.rotation.x,
          value?.y ?? this.$$target?.rotation.y,
          value?.z ?? this.$$target?.rotation.z,
        );
      })();

      this.$$target?.rotation.set(eulurValue.x, eulurValue.y, eulurValue.z);
    });
  }

  @Watch('position', { deep: true, immediate: true })
  protected whenTranslate(value: PropsImpl['position']): void {
    nextTick(() => {
      const vectorValue = (() => {
        if (typeof value === 'number') { return new Vector3(value, value, value); }

        return new Vector3(
            value?.x ?? this.$$target?.position.x,
            value?.y ?? this.$$target?.position.y,
            value?.z ?? this.$$target?.position.z,
        );
      })();

      this.$$target?.position.set(vectorValue.x, vectorValue.y, vectorValue.z);
    });
  }

  @Watch('scale', { deep: true, immediate: true })
  protected whenScale(value: PropsImpl['scale']): void {
    nextTick(() => {
      const vectorValue = (() => {
        if (typeof value === 'number') { return new Vector3(value, value, value); }

        return new Vector3(
          value?.x ?? this.$$target?.scale.x,
          value?.y ?? this.$$target?.scale.y,
          value?.z ?? this.$$target?.scale.z,
        );
      })();

      this.$$target?.scale.set(vectorValue.x, vectorValue.y, vectorValue.z);
    });
  }

  @Watch('lookAt', { deep: true, immediate: true })
  protected whenLookAt(value: PropsImpl['lookAt']): void {
    nextTick(() => {
      const vectorValue = (() => {
        if (typeof value === 'number') { return new Vector3(value, value, value); }

        return new Vector3(value?.x, value?.y, value?.z);
      })();

      this.$$target?.lookAt(vectorValue);
    });
  }

  @Watch('whenClick', { immediate: true })
  protected whenClickActionChanged(
    action: PropsImpl['whenClick'],
    prev: PropsImpl['whenClick'],
  ): void {
    this.subscribeToPointerEvent('click', action, prev);
  }

  @Watch('whenDblClick', { immediate: true })
  protected whenDblClickActionChanged(
    action: PropsImpl['whenDblClick'],
    prev: PropsImpl['whenDblClick'],
  ): void {
    this.subscribeToPointerEvent('dblclick', action, prev);
  }

  @Watch('whenMouseDown', { immediate: true })
  protected whenMouseDownActionChanged(
    action: PropsImpl['whenMouseDown'],
    prev: PropsImpl['whenMouseDown'],
  ): void {
    this.subscribeToPointerEvent('mousedown', action, prev);
  }

  @Watch('whenMouseUp', { immediate: true })
  protected whenMouseUpActionChanged(
    action: PropsImpl['whenMouseUp'],
    prev: PropsImpl['whenMouseUp'],
  ): void {
    this.subscribeToPointerEvent('mouseup', action, prev);
  }

  @Watch('whenMouseMove', { immediate: true })
  protected whenMouseMoveActionChanged(
    action: PropsImpl['whenMouseMove'],
    prev: PropsImpl['whenMouseMove'],
  ): void {
    this.subscribeToPointerEvent('mousemove', action, prev);
  }

  @Watch('whenWheel', { immediate: true })
  protected whenMouseWheelActionChanged(
    action: PropsImpl['whenWheel'],
    prev: PropsImpl['whenWheel'],
  ): void {
    this.subscribeToPointerEvent('wheel', action, prev);
  }

  @Watch('whenClickGlobal', { immediate: true })
  protected whenGlobalClickActionChanged(
    action: PropsImpl['whenClickGlobal'],
    prev: PropsImpl['whenClickGlobal'],
  ): void {
    this.subscribeToPointerEvent('click', action, prev, true);
  }

  @Watch('whenDblClickGlobal', { immediate: true })
  protected whenGlobalDblClickActionChanged(
    action: PropsImpl['whenDblClickGlobal'],
    prev: PropsImpl['whenDblClickGlobal'],
  ): void {
    this.subscribeToPointerEvent('dblclick', action, prev, true);
  }

  @Watch('whenMouseDownGlobal', { immediate: true })
  protected whenGlobalMouseDownActionChanged(
    action: PropsImpl['whenMouseDownGlobal'],
    prev: PropsImpl['whenMouseDownGlobal'],
  ): void {
    this.subscribeToPointerEvent('mousedown', action, prev, true);
  }

  @Watch('whenMouseUpGlobal', { immediate: true })
  protected whenGlobalMouseUpActionChanged(
    action: PropsImpl['whenMouseUpGlobal'],
    prev: PropsImpl['whenMouseUpGlobal'],
  ): void {
    this.subscribeToPointerEvent('mouseup', action, prev, true);
  }

  @Watch('whenMouseMoveGlobal', { immediate: true })
  protected whenGlobalMouseMoveActionChanged(
    action: PropsImpl['whenMouseMoveGlobal'],
    prev: PropsImpl['whenMouseMoveGlobal'],
  ): void {
    this.subscribeToPointerEvent('mousemove', action, prev, true);
  }

  @Watch('whenWheelGlobal', { immediate: true })
  protected whenGlobalMouseWheelActionChanged(
    action: PropsImpl['whenWheelGlobal'],
    prev: PropsImpl['whenWheelGlobal'],
  ): void {
    this.subscribeToPointerEvent('wheel', action, prev, true);
  }

  public unmounted(): void {
    this.$$target?.remove();
    this.$$target?.removeFromParent();
  }

  public add(
    ...objects: Parameters<IObjectComponent['add']>
  ): ReturnType<IObjectComponent['add']> {
    if (!this.$$target) {
      throw new Error('Can not add objects to this object. This object is null');
    }

    this.$$target?.add(...objects);
    return this.$$target;
  }

  public remove(
    ...objects: Parameters<IObjectComponent['remove']>
  ): ReturnType<IObjectComponent['remove']> {
    if (!this.$$target) {
      throw new Error('Can not remove objects from this object. This object is null');
    }

    this.$$target?.remove(...objects);
    return this.$$target;
  }

  private subscribeToPointerEvent(
    event: keyof PointerEventMap,
    action: IntersectionEventHandler | null,
    prevAction?: IntersectionEventHandler | null,
    // listen all event by type on canvas
    globalEvent = false,
  ): void {
    // disable previus action
    if (prevAction) {
      this.$$emitter?.off(event, prevAction);
    }

    if (!action) {
      return;
    }
    // disable listener when unmounted
    onUnmounted(() => this.$$emitter?.off(event, action));
    // subscribe to pointer events
    this.$$emitter?.on<IntersectionGlobalEventHandler>(event, (uuids, intersecteds) => {
      if (!action) {
        return;
      }

      const intersectedTarget = this.$$target?.uuid === intersecteds[0].object.uuid
        ? intersecteds[0]
        : null;

      if (globalEvent || (!globalEvent && intersectedTarget)) {
        action(uuids, intersecteds, intersectedTarget);
      }
    });
  }
}
