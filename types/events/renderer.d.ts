import { Camera, WebGLRenderer, Scene } from 'three';
export declare type RenderActionArguments = [number, WebGLRenderer, Camera, Scene];
export declare type RenderAction = (...args: RenderActionArguments) => void;
export interface RendererEvents {
    beforerender: RenderAction;
}
export declare const RENDERER_EVENTS: Array<keyof RendererEvents>;
