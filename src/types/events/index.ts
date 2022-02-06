import { Intersection, Object3D } from 'three';

export type IntersectionEventHandlerArguments = [ Array<string>, Array<Intersection<Object3D>>]

export type IntersectionEventHandler = (...args: IntersectionEventHandlerArguments) => void
