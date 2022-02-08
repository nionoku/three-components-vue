import { Intersection, Object3D } from 'three';

export type IntersectionGlobalEventHandlerArguments =
  [ Array<string>, Array<Intersection<Object3D>>]

export type IntersectionGlobalEventHandler =
  (...args: IntersectionGlobalEventHandlerArguments) => void

export type IntersectionEventHandlerArguments =
  [ Array<string>, Array<Intersection<Object3D>>, Intersection<Object3D> | null]

export type IntersectionEventHandler =
  (...args: IntersectionEventHandlerArguments) => void
