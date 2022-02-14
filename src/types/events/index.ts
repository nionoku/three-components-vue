import { PointerEvents, POINTER_EVENTS } from './pointer';
import { RendererEvents, RENDERER_EVENTS } from './renderer';

export type ComponentEvents = PointerEvents | RendererEvents

export type ComponentEventMap = keyof PointerEvents | keyof RendererEvents

export const EVENTS: Array<ComponentEventMap> = [
  ...RENDERER_EVENTS,
  ...POINTER_EVENTS,
];
