import { Intersection, Object3D } from 'three';
import { ComponentPublicInstance } from 'vue';
import { IntersectionEventHandlerArguments } from './events';
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

export interface SupportsPointerEvents {
  whenClick: (...args: IntersectionEventHandlerArguments) => void
}
