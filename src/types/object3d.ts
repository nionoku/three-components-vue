import { Object3D } from 'three';
import { ComponentPublicInstance } from 'vue';
import { IntersectionEventHandler, IntersectionGlobalEventHandler } from './events/intersection';
import { Vec3 } from './vector';

export interface ObjectComponent extends
  ComponentPublicInstance,
  Pick<Object3D, 'isObject3D' | 'add' | 'remove'>
{}

export interface Transformatable {
  rotation: Vec3,
  position: Vec3,
  lookAt: Vec3,
  scale: Vec3
}

export type Shadowable = Pick<Object3D, 'castShadow' | 'receiveShadow'>

export interface SupportsPointerEvents<
    V = IntersectionEventHandler,
    VG = IntersectionGlobalEventHandler
> {
  whenClick: V
  whenMouseMove: V
  whenMouseUp: V
  whenMouseDown: V
  whenDblClick: V
  whenWheel: V
  // listen all mouse actions on canvas
  whenClickGlobal: VG
  whenMouseMoveGlobal: VG
  whenMouseUpGlobal: VG
  whenMouseDownGlobal: VG
  whenDblClickGlobal: VG
  whenWheelGlobal: VG
}
