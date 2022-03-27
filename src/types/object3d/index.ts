import { Object3D } from 'three';

export type Object3DComponent = Pick<Object3D, 'isObject3D' | 'add' | 'remove'>
