import { IntersectionEventHandlerArguments } from '@/types/events';
import { DEFAULT_POINTER_EVENTS_KEYS, MouseEventMap } from '@/types/events/mouse';
import { Handler } from '@/types/handler';
import {
  Camera, Object3D, Raycaster,
} from 'three';
import { TinyEmitter } from 'tiny-emitter';

type TypedEventListener<E extends Event> = (event: E) => void

class PointerEventHandlers implements Handler {
  protected emitter = new TinyEmitter()

  protected raycaster = new Raycaster()

  protected listeners: Partial<Record<MouseEventMap, TypedEventListener<MouseEvent>>> = {};

  // eslint-disable-next-line no-useless-constructor
  constructor(
    protected rootElement: HTMLCanvasElement,
    protected camera: Camera,
    /** like a scene */
    protected targetsContainer: Object3D,
  ) {}

  public start(): void {
    DEFAULT_POINTER_EVENTS_KEYS.forEach((it) => {
      const key = it as MouseEventMap;

      this.listeners[key] = (event: MouseEvent) => {
        const [clickX, clickY] = [
          (event.clientX / window.innerWidth) * 2 - 1,
          (event.clientY / window.innerHeight) * 2 * -1 + 1,
        ];

        this.raycaster.setFromCamera({ x: clickX, y: clickY }, this.camera);

        const intersects = this.raycaster.intersectObjects(this.targetsContainer.children);

        if (intersects.length > 0) {
          this.emitter.emit<MouseEventMap, IntersectionEventHandlerArguments>(
            it,
            intersects.map((it) => it.object.uuid),
            intersects,
          );
        }
      };
    });

    Object.entries(this.listeners).forEach(([key, listener]) => {
      this.rootElement.addEventListener(key, (event) => {
        event.preventDefault()
        return listener
      });
    });
  }

  public cancel(): void {
    Object.entries(this.listeners).forEach(([key, listener]) => {
      // @ts-expect-error key are instanceof MouseEventMap
      this.rootElement.removeEventListener(key, listener);
    });
  }
}

export function usePointerEventHandlers(
  rootElement: HTMLCanvasElement,
  camera: Camera,
  targetsContainer: Object3D,
): Handler {
  return new PointerEventHandlers(rootElement, camera, targetsContainer);
}
