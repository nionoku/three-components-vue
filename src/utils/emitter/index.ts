import { RenderEvents } from '@/types/events/render';
import { EventDispatcher } from 'three';

export default new EventDispatcher();

const RenderEmitter: EventDispatcher<RenderEvents> = new EventDispatcher();

export {
  RenderEmitter,
};
