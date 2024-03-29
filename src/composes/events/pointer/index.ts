import { PointerEvent, PointerEventData } from '@/types/events/pointer';
import { PointerEmitter } from '@/utils/emitter';
import {
  Camera, Object3D, Raycaster, Vec2,
} from 'three';

type PointerEventsLocal = PointerEvent
type PointerEventsGlobal = `${PointerEventsLocal}Global`
type PointerEventsEmits = PointerEventsLocal | PointerEventsGlobal

type PointerEventsEmitsType = Record<PointerEventsEmits, (ctx: PointerEventData) => void>
export type PointerEventsEmit = (event: PointerEventsEmits, ctx: PointerEventData) => void

export const usePointerEventsEmits: PointerEventsEmitsType = {
  click(intersects: PointerEventData) {
    return true;
  },
  clickGlobal(intersects: PointerEventData) {
    return true;
  },
  mousemove(intersects: PointerEventData) {
    return true;
  },
  mousemoveGlobal(intersects: PointerEventData) {
    return true;
  },
};

export function usePointerEvents(
  { uuid }: Object3D,
  emit: PointerEventsEmit,
) {
  const сallback = (type: PointerEvent, ctx: PointerEventData): void => {
    if (ctx.intersects?.[0]?.object?.uuid === uuid) {
      return emit(type, ctx);
    }

    return emit(`${type}Global`, ctx);
  };

  const callbacks: Record<PointerEvent, (ctx: PointerEventData) => void> = {
    click: (ctx: PointerEventData) => сallback('click', ctx),
    mousemove: (ctx: PointerEventData) => сallback('mousemove', ctx),
  };

  return {
    subscribe() {
      return Object.entries(callbacks).map(
        ([event, callback]) => PointerEmitter.addEventListener(event as PointerEvent, callback),
      );
    },
    unsubscribe() {
      return Object.entries(callbacks).map(
        ([event, callback]) => PointerEmitter.removeEventListener(event as PointerEvent, callback),
      );
    },
  };
}

export function useInitPointerEvents(
  canvas: HTMLCanvasElement,
  camera: Camera,
  target: Object3D,
) {
  const supportsEvents: Array<PointerEvent> = ['click', 'mousemove'];
  const pointerEventListener = ({
    clientX, clientY, type,
  }: MouseEvent) => {
    // TODO (2022.03.28): Add
    const raycaster = new Raycaster();
    const pointer: Vec2 = { x: 0, y: 0 };
    const {
      width: rootWidth, height: rootHeight, top: rootTop, left: rootLeft,
    } = canvas.getBoundingClientRect();

    pointer.x = ((clientX - rootLeft)
      / (window.innerWidth * (rootWidth / window.innerWidth))) * 2 - 1;
    pointer.y = ((clientY - rootTop)
      / (window.innerHeight * (rootHeight / window.innerHeight))) * 2 * -1 + 1;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects([target]);

    PointerEmitter.dispatchEvent({ type: type as PointerEvent, intersects });
  };

  return {
    subscribe() {
      return supportsEvents.map((it) => canvas.addEventListener(it, pointerEventListener));
    },
    unsubscribe() {
      return supportsEvents.map((it) => canvas.removeEventListener(it, pointerEventListener));
    },
  };
}
