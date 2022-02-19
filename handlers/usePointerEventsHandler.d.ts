import { PointerEvents } from '@/types/events/pointer';
import { Handler } from '@/types/handler';
import { Camera, Object3D } from 'three';
import { TinyEmitter } from 'tiny-emitter';
export declare function usePointerEventsHandler(emitter: TinyEmitter<keyof PointerEvents>, rootElement: HTMLCanvasElement, camera: Camera, targetsContainer: Object3D): Handler;
