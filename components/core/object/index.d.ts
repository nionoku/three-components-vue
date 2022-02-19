import { ComponentEventMap } from '@/types/events';
import { Object3D } from 'three';
import { TinyEmitter } from 'tiny-emitter';
import { Component } from '../component';
import { Shadowable } from './_shadowable';
import { SupportsPointerEvents } from './_supportsPointerEvents';
import { Transformable } from './_transformable';
interface Props extends Partial<Transformable>, Partial<Shadowable>, Partial<SupportsPointerEvents> {
}
interface PropsImpl extends Omit<Required<Props>, keyof Transformable | keyof SupportsPointerEvents>, Nullable<Transformable>, Nullable<SupportsPointerEvents> {
}
declare type IObjectComponent = Pick<Object3D, 'isObject3D' | 'add' | 'remove'>;
export declare abstract class ObjectComponent<T extends Object3D, P = Record<string, unknown>> extends Component<T, P & Props> implements IObjectComponent, PropsImpl {
    readonly isObject3D: IObjectComponent['isObject3D'];
    readonly castShadow: PropsImpl['castShadow'];
    readonly receiveShadow: PropsImpl['receiveShadow'];
    readonly position: PropsImpl['position'];
    readonly rotate: PropsImpl['rotate'];
    readonly lookAt: PropsImpl['lookAt'];
    readonly scale: PropsImpl['scale'];
    readonly whenClick: PropsImpl['whenClick'];
    readonly whenDblClick: PropsImpl['whenDblClick'];
    readonly whenMouseDown: PropsImpl['whenMouseDown'];
    readonly whenMouseUp: PropsImpl['whenMouseUp'];
    readonly whenMouseMove: PropsImpl['whenMouseMove'];
    readonly whenWheel: PropsImpl['whenWheel'];
    readonly whenClickGlobal: PropsImpl['whenClickGlobal'];
    readonly whenDblClickGlobal: PropsImpl['whenDblClickGlobal'];
    readonly whenMouseDownGlobal: PropsImpl['whenMouseDownGlobal'];
    readonly whenMouseUpGlobal: PropsImpl['whenMouseUpGlobal'];
    readonly whenMouseMoveGlobal: PropsImpl['whenMouseMoveGlobal'];
    readonly whenWheelGlobal: PropsImpl['whenWheelGlobal'];
    protected $$emitter: TinyEmitter<ComponentEventMap> | null;
    protected whenRotate(value: PropsImpl['rotate']): void;
    protected whenTranslate(value: PropsImpl['position']): void;
    protected whenScale(value: PropsImpl['scale']): void;
    protected whenLookAt(value: PropsImpl['lookAt']): void;
    protected whenClickActionChanged(action: PropsImpl['whenClick'], prev: PropsImpl['whenClick']): void;
    protected whenDblClickActionChanged(action: PropsImpl['whenDblClick'], prev: PropsImpl['whenDblClick']): void;
    protected whenMouseDownActionChanged(action: PropsImpl['whenMouseDown'], prev: PropsImpl['whenMouseDown']): void;
    protected whenMouseUpActionChanged(action: PropsImpl['whenMouseUp'], prev: PropsImpl['whenMouseUp']): void;
    protected whenMouseMoveActionChanged(action: PropsImpl['whenMouseMove'], prev: PropsImpl['whenMouseMove']): void;
    protected whenMouseWheelActionChanged(action: PropsImpl['whenWheel'], prev: PropsImpl['whenWheel']): void;
    protected whenGlobalClickActionChanged(action: PropsImpl['whenClickGlobal'], prev: PropsImpl['whenClickGlobal']): void;
    protected whenGlobalDblClickActionChanged(action: PropsImpl['whenDblClickGlobal'], prev: PropsImpl['whenDblClickGlobal']): void;
    protected whenGlobalMouseDownActionChanged(action: PropsImpl['whenMouseDownGlobal'], prev: PropsImpl['whenMouseDownGlobal']): void;
    protected whenGlobalMouseUpActionChanged(action: PropsImpl['whenMouseUpGlobal'], prev: PropsImpl['whenMouseUpGlobal']): void;
    protected whenGlobalMouseMoveActionChanged(action: PropsImpl['whenMouseMoveGlobal'], prev: PropsImpl['whenMouseMoveGlobal']): void;
    protected whenGlobalMouseWheelActionChanged(action: PropsImpl['whenWheelGlobal'], prev: PropsImpl['whenWheelGlobal']): void;
    unmounted(): void;
    add(...objects: Parameters<IObjectComponent['add']>): ReturnType<IObjectComponent['add']>;
    remove(...objects: Parameters<IObjectComponent['remove']>): ReturnType<IObjectComponent['remove']>;
    private subscribeToPointerEvent;
}
export {};
