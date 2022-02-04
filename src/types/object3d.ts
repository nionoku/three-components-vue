import { Object3D } from 'three';

export interface ObjectContainer {
  add(...objects: Array<Object3D>): void
  remove(...objects: Array<Object3D>): void
}
