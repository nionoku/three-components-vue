import { ComponentEventMap } from '@/types/events';
import { RenderAction } from '@/types/events/renderer';
import { Handler } from '@/types/handler';
import { Camera, Scene, WebGLRenderer, WebGLRendererParameters } from 'three';
import { TinyEmitter } from 'tiny-emitter';
import { ComponentPublicInstance } from 'vue';
import { Component } from '../component';
export declare const EMITTER_KEY: unique symbol;
interface Props {
    parameters?: {
        width?: number;
        height?: number;
        pixelRatio?: number;
        fps?: number;
    } & Partial<Pick<WebGLRendererParameters, 'antialias' | 'alpha' | 'powerPreference'>>;
    whenBeforeRender?: RenderAction;
}
interface PropsImpl extends Required<Omit<Props, 'whenBeforeRender' | 'parameters'>> {
    parameters: NonNullable<Props['parameters']> | null;
    whenBeforeRender: NonNullable<Props['whenBeforeRender']> | null;
}
export interface RendererComponent extends ComponentPublicInstance {
    isRenderer: true;
    setScene(scene: Scene): void;
    setCamera(camera: Camera): void;
    startRendering(): void;
    cancelRendering(): void;
}
export default class Renderer extends Component<WebGLRenderer, Props> implements RendererComponent, PropsImpl {
    readonly isRenderer: RendererComponent['isRenderer'];
    readonly parameters: PropsImpl['parameters'];
    readonly whenBeforeRender: PropsImpl['whenBeforeRender'];
    protected $$emitter: TinyEmitter<ComponentEventMap> | null;
    protected $$scene: Scene | null;
    protected $$camera: Camera | null;
    protected $$looper: Handler | null;
    protected $$pointerEventListener: Handler | null;
    protected $$target: WebGLRenderer | null;
    protected whenBeforeRenderChanged(action: PropsImpl['whenBeforeRender'], prev: PropsImpl['whenBeforeRender']): void;
    beforeCreate(): void;
    created(): void;
    mounted(): void;
    beforeUnmount(): void;
    setScene(scene: Scene): void;
    setCamera(camera: Camera): void;
    startRendering(): void;
    cancelRendering(): void;
    stopListeners(): void;
    protected createTarget(): WebGLRenderer;
    private subscribeToRenderEvent;
    protected get width(): number;
    protected get height(): number;
    protected get pixelRatio(): number;
    protected get fps(): number;
}
export {};
