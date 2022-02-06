import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import {
  WebGLRendererParameters,
  WebGLRenderer,
  Scene,
  Camera,
} from 'three';
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { PowerPreference } from '@/types/renderer';
import { ComponentPublicInstance } from 'vue';
import { useLooper } from '@/handlers/useLooper';
import { Component } from '@/components/super/component';
import { Handler } from '@/types/handler';
import { usePointerEventHandlers } from '@/handlers/useEventListeners';

export interface Props extends Partial<Pick<WebGLRendererParameters, 'alpha' | 'antialias' | 'powerPreference'>> {
  width?: number
  height?: number
  pixelRatio?: number
  powerPreference?: PowerPreference
  fps?: number
}

type RenderAction = (renderer: WebGLRenderer, camera: Camera, scene: Scene) => void

export interface RendererComponent extends ComponentPublicInstance {
  isRenderer: true
  setScene(scene: Scene): void
  setCamera(camera: Camera): void
  startRendering(): void
  cancelRendering(): void
  addOnBeforeRender(action: RenderAction): void
  removeOnBeforeRender(action: RenderAction): void
}

@Options({})
export default class Renderer extends Component<Props, WebGLRenderer> implements
    Required<Props>,
    RendererComponent {
  public declare $props: Props

  public declare $parent: ComponentPublicInstance;

  @Prop({ type: Number, default: 100 })
  public readonly width!: NonNullable<Props['width']>;

  @Prop({ type: Number, default: 100 })
  public readonly height!: NonNullable<Props['height']>;

  @Prop({ type: Boolean, default: false })
  public readonly antialias!: NonNullable<Props['antialias']>;

  @Prop({ type: Boolean, default: false })
  public readonly alpha!: NonNullable<Props['alpha']>;

  @Prop({ type: Number, default: window.devicePixelRatio })
  public readonly pixelRatio!: NonNullable<Props['pixelRatio']>;

  @Prop({ type: Number, default: 30 })
  public readonly fps!: NonNullable<Props['fps']>;

  @Prop({ type: String, default: PowerPreference.DEFAULT })
  public readonly powerPreference!: NonNullable<Props['powerPreference']>;

  public readonly isRenderer: RendererComponent['isRenderer'] = true

  protected $$scene: Scene | null = null

  protected $$camera: Camera | null = null

  protected $$looper: Handler | null = null

  protected $$pointerEventListener: Handler | null = null

  protected $$whenBeforeRender: Array<RenderAction> | null = null

  public created(): void {
    if (!WebGL.isWebGLAvailable()) {
      throw new Error('This browser is not supports WebGL');
    }

    this.$$target = this.createTarget();
    this.$$whenBeforeRender = [];
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
      throw new Error('Can not start rendering. Camera is nuu');
    }

    this.$$pointerEventListener = usePointerEventHandlers(
      this.$$target.domElement,
      this.$$camera,
      this.$$scene,
    );
    this.$$looper = useLooper(this.fps, () => {
      if (!this.$$target) {
        throw new Error('Can not render scene. Renderer is null');
      }

      if (!this.$$scene) {
        throw new Error('Can not render scene. Scene is null');
      }

      if (!this.$$camera) {
        throw new Error('Can not render scene. Camera is null');
      }

      // @ts-expect-error target, scene and camera not null
      this.$$whenBeforeRender?.forEach((it) => it(this.$$target, this.$$camera, this.$$scene));
      this.$$target.render(this.$$scene, this.$$camera);
    });
    this.$$looper.start();
    this.$$pointerEventListener.start();
  }

  public cancelRendering(): void {
    this.$$looper?.cancel();
    this.$$looper = null;
  }

  public addOnBeforeRender(action: RenderAction): void {
    this.$$whenBeforeRender?.push(action);
  }

  public removeOnBeforeRender(action: RenderAction): void {
    this.$$whenBeforeRender?.splice(this.$$whenBeforeRender.indexOf(action), 1);
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
}
