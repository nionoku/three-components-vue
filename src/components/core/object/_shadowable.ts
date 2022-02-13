import { Object3D } from 'three';

export type Shadowable = Pick<Object3D, 'castShadow' | 'receiveShadow'>
