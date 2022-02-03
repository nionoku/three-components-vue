import { Options, Vue } from 'vue-class-component';
import { Prop, ProvideReactive } from 'vue-property-decorator';
import {
  WebGLRendererParameters,
  WebGLRenderer,
  Scene,
  Camera,
} from 'three';
import { ImplRenderer as InjectRenderer, PowerPreference } from '@/types/renderer';

export const RENDERER_KEY = Symbol('renderer');

export interface Props extends Required<Pick<WebGLRendererParameters, 'alpha' | 'antialias' | 'powerPreference'>> {
  width: number
  height: number
  pixelRatio: number
  powerPreference: PowerPreference
  fps: number
}

export interface RendererComponent {
  isRenderer: boolean
  setScene(scene: Scene): void
  setCamera(camera: Camera): void
}

@Options({})
export default class Renderer extends Vue implements Props, RendererComponent, InjectRenderer {
  @Prop({ type: Number, default: 100 })
  public readonly width!: Props['width'];

  @Prop({ type: Number, default: 100 })
  public readonly height!: Props['height'];

  @Prop({ type: Boolean, default: false })
  public readonly antialias!: Props['antialias'];

  @Prop({ type: Boolean, default: false })
  public readonly alpha!: Props['alpha'];

  @Prop({ type: Number, default: 1 })
  public readonly pixelRatio!: Props['pixelRatio'];

  @Prop({ type: Number, default: 60 })
  public readonly fps!: Props['fps'];

  @Prop({ type: String, default: PowerPreference.DEFAULT })
  public readonly powerPreference!: Props['powerPreference'];

  @ProvideReactive(RENDERER_KEY)
  public renderer: WebGLRenderer | null = null

  public readonly isRenderer = true

  protected $$scene: Scene | null = null

  protected $$camera: Camera | null = null

  public created(): void {
    this.renderer = new WebGLRenderer({
      antialias: this.antialias,
      alpha: this.alpha,
      powerPreference: this.powerPreference,
    });

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(this.pixelRatio);
  }

  public mounted(): void {
    if (!this.renderer) {
      throw new Error('Renderer not ready');
    }

    if (!this.$parent) {
      throw new Error('Parent for render does not exist');
    }

    // append canvas to parent
    (this.$parent.$el as HTMLElement)
      .appendChild(this.renderer.domElement);
  }

  public setScene(scene: Scene): void {
    this.$$scene = scene;
  }

  public setCamera(camera: Camera): void {
    this.$$camera = camera;
  }

  // TODO (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }
}
