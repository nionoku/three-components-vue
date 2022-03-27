import { WebGLRenderer, Scene, Camera } from 'three';

export type RenderEvents =
  'start-rendering'
    | 'cancel-rendering'
    | 'before-render'
    | 'renderer-ready'

export interface BeforeRenderArguments {
  delta: number
  time: number
  renderer: WebGLRenderer
  scene: Scene
  camera: Camera
}

export type BeforeRenderHandler = (args: BeforeRenderArguments) => void
