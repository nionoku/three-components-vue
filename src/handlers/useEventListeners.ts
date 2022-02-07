import { IntersectionEventHandlerArguments } from '@/types/events';
import { DEFAULT_POINTER_EVENTS_KEYS, MouseEventMap } from '@/types/events/mouse';
import { Handler } from '@/types/handler';
import {
  Camera, Object3D, Raycaster, Vector2,
} from 'three';
import Emitter from 'tiny-emitter/instance';

type TypedEventListener<E extends Event> = (event: E) => void

interface TypedMouseEvent extends Omit<MouseEvent, 'type'> {
  type: MouseEventMap
}

class PointerEventHandlers implements Handler {
  protected pointerPosition = new Vector2()

  protected raycaster = new Raycaster()

  protected listeners: Partial<Record<MouseEventMap, TypedEventListener<TypedMouseEvent>>> = {};

  protected mouseEventListener = ({ clientX, clientY, type }: TypedMouseEvent) => {
    const {
      width: rootWidth, height: rootHeight, top: rootTop, left: rootLeft,
    } = this.rootElement.getBoundingClientRect();
    this.pointerPosition.x = ((clientX - rootLeft)
      / (window.innerWidth * (rootWidth / window.innerWidth))) * 2 - 1;
    this.pointerPosition.y = ((clientY - rootTop)
      / (window.innerHeight * (rootHeight / window.innerHeight))) * 2 * -1 + 1;

    this.raycaster.setFromCamera(this.pointerPosition, this.camera);

    const intersects = this.raycaster.intersectObjects(this.targetsContainer.children);

    if (intersects.length > 0) {
      Emitter.emit<MouseEventMap, IntersectionEventHandlerArguments>(
        type, intersects.map((it) => it.object.uuid), intersects,
      );
    }
  }

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

      this.listeners[key] = this.mouseEventListener;
    });

    Object.entries(this.listeners).forEach(([key, listener]) => {
      this.rootElement.addEventListener(key, (event) => listener(event as TypedMouseEvent));
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
