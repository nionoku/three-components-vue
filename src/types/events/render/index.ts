import {
  WebGLRenderer, Scene, Camera, BaseEvent,
} from 'three';

export interface RenderEventsType {
  type: 'start-rendering' | 'cancel-rendering' | 'before-render' | 'renderer-ready'
}

export interface BeforeRenderEvent extends RenderEventsType, BaseEvent {
  type: 'before-render'
  delta: number
  time: number
  renderer: WebGLRenderer
  scene: Scene
  camera: Camera
}

export interface SetupRenderEvent extends RenderEventsType, BaseEvent {
  type: 'start-rendering' | 'cancel-rendering' | 'renderer-ready'
}

export type RenderEvents = BeforeRenderEvent | SetupRenderEvent
