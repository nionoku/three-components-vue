import {
  WebGLRenderer, Scene, Camera, BaseEvent,
} from 'three';

type RenderEvent = 'start-rendering' | 'cancel-rendering' | 'before-render' | 'renderer-ready'

export interface RenderEventType {
  type: RenderEvent
}

export interface BeforeRenderEventData extends RenderEventType, BaseEvent {
  type: 'before-render'
  delta: number
  time: number
  renderer: WebGLRenderer
  scene: Scene
  camera: Camera
}

export interface SetupRenderEventData extends RenderEventType, BaseEvent {
  type: 'start-rendering' | 'cancel-rendering' | 'renderer-ready'
}

export type RenderEventData = BeforeRenderEventData | SetupRenderEventData
