import { Options } from 'vue-class-component';
import { Prop, ProvideReactive, Watch } from 'vue-property-decorator';
import {
  WebGLRendererParameters,
  WebGLRenderer,
  Scene,
  Camera,
} from 'three';
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { PowerPreference } from '@/types/renderer';
import { ComponentPublicInstance, onBeforeUnmount } from 'vue';
import { useLooper } from '@/handlers/useLooper';
import { Component } from '@/components/super/component';
import { Handler } from '@/types/handler';
import { usePointerEventHandlers } from '@/handlers/useEventListeners';
import { ComponentEvents } from '@/types/events';
import { RenderAction, RenderActionArguments, RendererEventMap } from '@/types/events/renderer';
import { TinyEmitter } from 'tiny-emitter';

export const EMITTER_KEY = Symbol('emitter');

interface Props extends Pick<WebGLRendererParameters, 'alpha' | 'antialias' | 'powerPreference'> {
  width: number
  height: number
  pixelRatio: number
  powerPreference: PowerPreference
  fps: number
  whenBeforeRender: RenderAction
}

export interface RendererComponent extends ComponentPublicInstance {
  isRenderer: true
  setScene(scene: Scene): void
  setCamera(camera: Camera): void
  startRendering(): void
  cancelRendering(): void
}

interface PropsImpl extends Omit<Props, 'whenBeforeRender'> {
  whenBeforeRender: RenderAction | null
}

@Options({})
export default class Renderer extends Component<WebGLRenderer, Partial<Props>> implements
    PropsImpl,
    RendererComponent {
  declare public $parent: ComponentPublicInstance;

  @ProvideReactive(EMITTER_KEY)
  protected $$emitter: TinyEmitter<ComponentEvents> | null = null;

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

  public readonly isRenderer: RendererComponent['isRenderer'] = true

  protected $$scene: Scene | null = null

  protected $$camera: Camera | null = null

  protected $$looper: Handler | null = null

  protected $$pointerEventListener: Handler | null = null

  @Watch('whenBeforeRender', { immediate: true })
  protected whenBeforeRenderChanged(
    action: PropsImpl['whenBeforeRender'],
    prev: PropsImpl['whenBeforeRender'],
  ): void {
    this.subscribeToEvent('beforerender', action, prev);
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

  public beforeDestroy(): void {
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

    this.$$pointerEventListener = usePointerEventHandlers(
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

  private subscribeToEvent(
    event: keyof RendererEventMap,
    action: RenderAction | null,
    prevAction?: RenderAction | null,
  ): void {
    // disable previus action
    if (prevAction) {
      this.$$emitter?.off(event, prevAction);
    }

    const actionIsFunction = typeof action === 'function';

    if (actionIsFunction) {
      console.log(event, action, prevAction);
      // disable listener before unmount
      onBeforeUnmount(() => this.$$emitter?.off(event, action));

      this.$$emitter?.on<RenderAction>(
        event, (...args: RenderActionArguments) => {
          if (!actionIsFunction) {
            return undefined;
          }

          return action(...args);
        },
      );
    }
  }
}
