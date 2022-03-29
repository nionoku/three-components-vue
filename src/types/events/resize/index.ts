import { BaseEvent } from 'three';

type ResizeEvent = keyof Pick<GlobalEventHandlersEventMap, 'resize'>

export interface ResizeEventData extends BaseEvent {
  type: ResizeEvent
  rect: DOMRect
}
