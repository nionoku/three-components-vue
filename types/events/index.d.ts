import { PointerEvents } from './pointer';
import { RendererEvents } from './renderer';
export declare type ComponentEvents = PointerEvents | RendererEvents;
export declare type ComponentEventMap = keyof PointerEvents | keyof RendererEvents;
export declare const EVENTS: Array<ComponentEventMap>;
