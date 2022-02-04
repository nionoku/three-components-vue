import { Options, Vue } from 'vue-class-component';
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
import { ComponentWithProps } from '@/types/component';
import { Looper } from '@/handlers/Looper';
import { Component } from '@/components/super/component';

export interface Props extends Partial<Pick<WebGLRendererParameters, 'alpha' | 'antialias' | 'powerPreference'>> {
  width?: number
  height?: number
  pixelRatio?: number
  powerPreference?: PowerPreference
  fps?: number
}

export interface RendererComponent extends ComponentPublicInstance {
  isRenderer: true
  setScene(scene: Scene): void
  setCamera(camera: Camera): void
  startRendering(): void
  cancelRendering(): void
}

@Options({})
export default class Renderer extends Component implements
    ComponentWithProps<Props>,
    Props,
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

  @Prop({ type: Number, default: 60 })
  public readonly fps!: NonNullable<Props['fps']>;

  @Prop({ type: String, default: PowerPreference.DEFAULT })
  public readonly powerPreference!: NonNullable<Props['powerPreference']>;

  public readonly isRenderer: RendererComponent['isRenderer'] = true

  protected $$renderer: WebGLRenderer | null = null

  protected $$scene: Scene | null = null

  protected $$camera: Camera | null = null

  protected $$looper: Looper | null = null

  public created(): void {
    if (!WebGL.isWebGLAvailable()) {
      throw new Error('This browser is not supports WebGL');
    }

    this.$$renderer = this.createRenderer();
  }

  public mounted(): void {
    if (!this.$$renderer) {
      throw new Error('Renderer not ready');
    }

    if (!this.$parent) {
      throw new Error('Parent for render does not exist');
    }

    // append canvas to parent
    this.$parent.$el.appendChild(this.$$renderer.domElement);
  }

  public beforeDestroy(): void {
    this.$$renderer?.domElement.remove();
    this.$$renderer?.dispose();
  }

  public setScene(scene: Scene): void {
    this.$$scene = scene;
  }

  public setCamera(camera: Camera): void {
    this.$$camera = camera;
  }

  public startRendering(): void {
    if (!this.$$renderer) {
      throw new Error('Can not start rendering. Renderer not ready');
    }

    if (!this.$$scene) {
      throw new Error('Can not start rendering. Scene not mounted');
    }

    if (!this.$$camera) {
      throw new Error('Can not start rendering. Camera not mounted');
    }

    this.$$looper = new Looper(this.fps, this.$$renderer, this.$$scene, this.$$camera);
    this.$$looper.start();
  }

  public cancelRendering(): void {
    this.$$looper?.cancel();
    this.$$looper = null;
  }

  protected createRenderer(): WebGLRenderer {
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
