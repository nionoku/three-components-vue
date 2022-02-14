import { Camera, WebGLRenderer, Scene } from 'three';

export type RenderActionArguments = [number, WebGLRenderer, Camera, Scene]

export type RenderAction = (...args: RenderActionArguments) => void

export interface RendererEvents {
  beforerender: RenderAction
}

export const RENDERER_EVENTS: Array<keyof RendererEvents> = [
  'beforerender',
];
