import { Intersection, Object3D } from 'three';
export declare type IntersectionGlobalEventHandlerArguments = [
    Array<string>,
    Array<Intersection<Object3D>>
];
export declare type IntersectionGlobalEventHandler = (...args: IntersectionGlobalEventHandlerArguments) => void;
export declare type IntersectionEventHandlerArguments = [
    Array<string>,
    Array<Intersection<Object3D>>,
    Intersection<Object3D> | null
];
export declare type IntersectionEventHandler = (...args: IntersectionEventHandlerArguments) => void;
