import { PointerEventData } from '@/types/events/pointer';
import { RenderEventData } from '@/types/events/render';
import { ResizeEventData } from '@/types/events/resize';
import { EventDispatcher } from 'three';

export default new EventDispatcher();

const RenderEmitter: EventDispatcher<RenderEventData> = new EventDispatcher();
const PointerEmitter: EventDispatcher<PointerEventData> = new EventDispatcher();
const ResizeEmitter: EventDispatcher<ResizeEventData> = new EventDispatcher();

export {
  RenderEmitter,
  PointerEmitter,
  ResizeEmitter,
};
