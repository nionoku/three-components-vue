import { Object3D } from 'three';
import { ComponentPublicInstance } from 'vue';

export interface ObjectComponent extends
  ComponentPublicInstance,
  Pick<Object3D, 'isObject3D' | 'add' | 'remove'>
{}

export type SupportsShadowComponent = Pick<Object3D, 'castShadow' | 'receiveShadow'>
