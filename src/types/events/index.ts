import { PointerEventMap, POINTER_EVENTS } from './pointer';
import { RendererEventMap, RENDERER_EVENTS } from './renderer';

export type ComponentEvents = keyof PointerEventMap | keyof RendererEventMap

export const EVENTS: Array<ComponentEvents> = [
  ...RENDERER_EVENTS,
  ...POINTER_EVENTS,
];
