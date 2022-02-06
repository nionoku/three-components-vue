import { Object3D } from 'three';
import { ComponentPublicInstance } from 'vue';
import { Vec3 } from './vector';

export interface ObjectComponent extends
  ComponentPublicInstance,
  Pick<Object3D, 'isObject3D' | 'add' | 'remove'>
{}

export interface Transformatable {
  rotation?: Vec3,
  position?: Vec3,
  lookAt?: Vec3,
  scale?: Vec3
}

export type SupportsShadowComponent = Pick<Object3D, 'castShadow' | 'receiveShadow'>
