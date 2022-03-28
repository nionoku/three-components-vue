import { PointerEventsEvent } from '@/types/events/pointer';
import { RenderEvents } from '@/types/events/render';
import { EventDispatcher } from 'three';

export default new EventDispatcher();

const RenderEmitter: EventDispatcher<RenderEvents> = new EventDispatcher();
const PointerEmitter: EventDispatcher<PointerEventsEvent> = new EventDispatcher();

export {
  RenderEmitter,
  PointerEmitter,
};
