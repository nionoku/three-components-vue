import { useLooper } from '@/handlers/useLooper';
import { usePointerEventsHandler } from '@/handlers/usePointerEventsHandler';
import { ComponentEventMap } from '@/types/events';
import { RenderAction, RenderActionArguments, RendererEvents } from '@/types/events/renderer';
import { Handler } from '@/types/handler';
import {
  Camera, Scene, WebGLRenderer, WebGLRendererParameters,
} from 'three';
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { TinyEmitter } from 'tiny-emitter';
import { ComponentPublicInstance, onUnmounted } from 'vue';
import { Options } from 'vue-class-component';
import { Prop, ProvideReactive, Watch } from 'vue-property-decorator';
import { Component } from '../component';

export const EMITTER_KEY = Symbol('emitter');

enum PowerPreference {
  HIGH_PERFORMANCE = 'high-performance',
  LOW_POWER = 'low-power',
  DEFAULT = 'default'
}

interface Props extends Partial<Pick<WebGLRendererParameters, 'antialias' | 'alpha' | 'powerPreference'>> {
  width?: number
  height?: number
  pixelRatio?: number
  powerPreference?: PowerPreference
  fps?: number
  singleFrame?: boolean
  whenBeforeRender?: RenderAction
}

interface PropsImpl extends Required<Omit<Props, 'whenBeforeRender'>> {
  whenBeforeRender: RenderAction | null
}

export interface RendererComponent extends ComponentPublicInstance {
  isRenderer: true
  setScene(scene: Scene): void
  setCamera(camera: Camera): void
  startRendering(): void
  cancelRendering(): void
}

@Options({})
export default class Renderer
  extends Component<WebGLRenderer, Props>
  implements RendererComponent, PropsImpl {
  public readonly isRenderer: RendererComponent['isRenderer'] = true

  @Prop({ type: Number, default: 100 })
  public readonly width!: PropsImpl['width'];

  @Prop({ type: Number, default: 100 })
  public readonly height!: PropsImpl['height'];

  @Prop({ type: Boolean, default: false })
  public readonly antialias!: PropsImpl['antialias'];

  @Prop({ type: Boolean, default: false })
  public readonly alpha!: PropsImpl['alpha'];

  @Prop({ type: Number, default: window.devicePixelRatio })
  public readonly pixelRatio!: PropsImpl['pixelRatio'];

  @Prop({ type: Number, default: 60 })
  public readonly fps!: PropsImpl['fps'];

  @Prop({ type: String, default: PowerPreference.DEFAULT })
  public readonly powerPreference!: PropsImpl['powerPreference'];

  @Prop({ type: Function, default: null })
  public readonly whenBeforeRender!: PropsImpl['whenBeforeRender'];

  @Prop({ type: Boolean, default: false })
  public readonly singleFrame!: PropsImpl['singleFrame'];

  @ProvideReactive(EMITTER_KEY)
  protected $$emitter: TinyEmitter<ComponentEventMap> | null = null;

  protected $$scene: Scene | null = null

  protected $$camera: Camera | null = null

  protected $$looper: Handler | null = null

  protected $$pointerEventListener: Handler | null = null

  protected $$target: WebGLRenderer | null = null

  @Watch('whenBeforeRender', { immediate: true })
  protected whenBeforeRenderChanged(
    action: PropsImpl['whenBeforeRender'],
    prev: PropsImpl['whenBeforeRender'],
  ): void {
    this.subscribeToRenderEvent('beforerender', action, prev);
  }

  public beforeCreate(): void {
    this.$$emitter = new TinyEmitter();
  }

  public created(): void {
    if (!WebGL.isWebGLAvailable()) {
      throw new Error('This browser is not supports WebGL');
    }

    this.$$target = this.createTarget();
  }

  public mounted(): void {
    if (!this.$$target) {
      throw new Error('Renderer not ready');
    }

    if (!this.$parent) {
      throw new Error('Parent for render does not exist');
    }

    // append canvas to parent
    this.$parent.$el.appendChild(this.$$target.domElement);
  }

  public beforeUnmount(): void {
    this.stopListeners();
    this.cancelRendering();

    this.$$target?.domElement.remove();
    this.$$target?.dispose();
  }

  public setScene(scene: Scene): void {
    this.$$scene = scene;
  }

  public setCamera(camera: Camera): void {
    this.$$camera = camera;
  }

  public startRendering(): void {
    if (!this.$$target) {
      throw new Error('Can not start rendering. Renderer is null');
    }

    if (!this.$$scene) {
      throw new Error('Can not start rendering. Scene is null');
    }

    if (!this.$$camera) {
      throw new Error('Can not start rendering. Camera is null');
    }

    if (!this.$$emitter) {
      throw new Error('Can not start rendering. Event emitter is null');
    }

    // init event listeners and render looper
    this.$$pointerEventListener = usePointerEventsHandler(
      this.$$emitter,
      this.$$target.domElement,
      this.$$camera,
      this.$$scene,
    );
    this.$$looper = useLooper(this.fps, (time) => {
      if (!this.$$target) {
        throw new Error('Can not render scene. Renderer is null');
      }

      if (!this.$$scene) {
        throw new Error('Can not render scene. Scene is null');
      }

      if (!this.$$camera) {
        throw new Error('Can not render scene. Camera is null');
      }

      this.$$emitter?.emit<RenderActionArguments>(
        'beforerender', time, this.$$target, this.$$camera, this.$$scene,
      );
      this.$$target.render(this.$$scene, this.$$camera);
    });
    this.$$looper.start();
    this.$$pointerEventListener.start();
  }

  public cancelRendering(): void {
    this.$$looper?.cancel();
    this.$$looper = null;
  }

  public stopListeners(): void {
    this.$$pointerEventListener?.cancel();
    this.$$pointerEventListener = null;
  }

  protected createTarget(): WebGLRenderer {
    const renderer = new WebGLRenderer({
      antialias: this.antialias,
      alpha: this.alpha,
      powerPreference: this.powerPreference,
    });

    renderer.setSize(this.width, this.height);
    renderer.setPixelRatio(this.pixelRatio);

    return renderer;
  }

  private subscribeToRenderEvent(
    event: keyof RendererEvents,
    action: RenderAction | null,
    prevAction?: RenderAction | null,
  ): void {
    // disable previus action
    if (prevAction) {
      this.$$emitter?.off(event, prevAction);
    }

    if (!action) {
      return;
    }
    // disable listener when unmounted
    onUnmounted(() => this.$$emitter?.off(event, action));
    // subscribe to rendeder events
    this.$$emitter?.on<RenderAction>(event, (...args: RenderActionArguments) => {
      if (!action) {
        return;
      }

      action(...args);
    });
  }
}
