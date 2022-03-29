import { BaseEvent, Intersection } from 'three';

// 'mouseup' | 'mousedown' | 'mousemove' | 'click' | 'wheel'
export type PointerEvent = keyof Pick<GlobalEventHandlersEventMap, 'click' | 'mousemove'>

export interface PointerEventData extends BaseEvent {
  type: PointerEvent
  intersects: Array<Intersection>
}
