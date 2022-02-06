import { Handler } from '@/types/handler';
import {
  Camera, Intersection, Object3D, Raycaster,
} from 'three';
import { TinyEmitter } from 'tiny-emitter';

type TypedEventListener<E extends Event> = (event: E) => void

export interface EventHandler {
  uuids: Array<string>,
  intersects: Array<Intersection<Object3D>>
}

export type MouseEventMap = keyof Pick<GlobalEventHandlersEventMap,
'mouseup'
  | 'mousedown'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousemove'
  | 'mouseout'
  | 'mouseover'
  | 'click'
  | 'dblclick'
  | 'wheel'
>

const DEFAULT_POINTER_LISTENERS: Record<MouseEventMap, TypedEventListener<MouseEvent>> = {
  mouseup: () => undefined,
  mousedown: () => undefined,
  mouseenter: () => undefined,
  mouseleave: () => undefined,
  mousemove: () => undefined,
  mouseout: () => undefined,
  mouseover: () => undefined,
  click: () => undefined,
  dblclick: () => undefined,
  wheel: () => undefined,
};

class PointerEventHandlers<K extends MouseEventMap, E extends MouseEvent> implements Handler {
  protected emitter = new TinyEmitter()

  protected raycaster = new Raycaster()

  protected listeners: Record<K, TypedEventListener<E>> = { ...DEFAULT_POINTER_LISTENERS };

  // eslint-disable-next-line no-useless-constructor
  constructor(
    protected rootElement: HTMLCanvasElement,
    protected camera: Camera,
    /** like a scene */
    protected targetsContainer: Object3D,
  ) {}

  public start(): void {
    this.listenersKeys.forEach((it) => {
      this.rootElement.addEventListener(it, this.listeners[it] as EventListener);
    });
  }

  public cancel(): void {
    this.removeListeners(this.listenersKeys);
  }

  public setListeners(type: Array<K>): void {
    this.removeListeners(type);
    type.forEach((it) => {
      this.listeners[it] = (event: E) => {
        const [clickX, clickY] = [
          (event.clientX / window.innerWidth) * 2 - 1,
          (event.clientY / window.innerHeight) * 2 * -1 + 1,
        ];

        this.raycaster.setFromCamera({ x: clickX, y: clickY }, this.camera);

        const intersects = this.raycaster.intersectObjects(this.targetsContainer.children);

        if (intersects.length > 0) {
          this.emitter.emit(it, intersects.map((it) => it.object.uuid), intersects);
        }
      };
    });
  }

  public removeListeners(type: Array<K> = this.listenersKeys): void {
    type.forEach((it) => {
      this.rootElement.removeEventListener(it, this.listeners[it] as EventListener);
    });
  }

  protected get listenersKeys(): Array<K> {
    return Object.keys(this.listeners) as Array<K>;
  }

  protected get listenersEntries() {
    return Object.entries(this.listeners);
  }
}

export function usePointerEventHandlers(
  rootElement: HTMLCanvasElement,
  camera: Camera,
  targetsContainer: Object3D,
): Handler {
  return new PointerEventHandlers(rootElement, camera, targetsContainer);
}
