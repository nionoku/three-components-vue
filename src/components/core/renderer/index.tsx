import { Options, Vue } from 'vue-class-component';
import { Prop, ProvideReactive } from 'vue-property-decorator';
import {
  WebGLRendererParameters,
  WebGLRenderer,
  Scene,
  Camera,
} from 'three';
import { InjectRenderer, PowerPreference } from '@/types/renderer';
import { ComponentPublicInstance } from 'vue';
import { ComponentWithProps } from '@/types/component';

export const RENDERER_KEY = Symbol('renderer');

export interface Props extends Pick<WebGLRendererParameters, 'alpha' | 'antialias' | 'powerPreference'> {
  width?: number
  height?: number
  pixelRatio?: number
  powerPreference?: PowerPreference
  fps?: number
}

export interface RendererComponent extends ComponentPublicInstance {
  isRenderer: boolean
  setScene(scene: Scene): void
  setCamera(camera: Camera): void
  startRendering(): void
  cancelRendering(): void
}

interface Looper {
  loop(time: number): void
  cancel(): void
}

@Options({})
export default class Renderer extends Vue implements
    ComponentWithProps<Props>,
    RendererComponent,
    InjectRenderer {
  public declare $props: Props

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

  /** @deprecated will be removed */
  @ProvideReactive(RENDERER_KEY)
  public renderer: InjectRenderer['renderer'] = null

  public readonly isRenderer: RendererComponent['isRenderer'] = true

  protected $$scene: Scene | null = null

  protected $$camera: Camera | null = null

  protected $$looper: Looper | null = null

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

  public beforeDestroy(): void {
    this.renderer?.domElement.remove();
    this.renderer?.dispose();
  }

  public setScene(scene: Scene): void {
    this.$$scene = scene;
  }

  public setCamera(camera: Camera): void {
    this.$$camera = camera;
  }

  public startRendering(): void {
    if (!this.$$scene) {
      throw new Error('Can not start rendering. Scene not mounted');
    }

    if (!this.$$camera) {
      throw new Error('Can not start rendering. Camera not mounted');
    }

    this.$$looper = this.looper(this.$$scene, this.$$camera);
    this.$$looper.loop(0);
  }

  public cancelRendering(): void {
    this.$$looper?.cancel();
    this.$$looper = null;
  }

  // TODO (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }

  protected looper(scene: Scene, camera: Camera): Looper {
    const timestep = 1000 / this.fps;
    let lastTimestamp = 0;
    let hasLoop = true;

    const handler = (time: number): void => {
      if (!hasLoop) return;

      requestAnimationFrame(handler);
      // FPS counter
      if (time - lastTimestamp < timestep) return;

      lastTimestamp = time;
      this.whenRender(scene, camera);
    };

    const cancel = () => { hasLoop = false; };

    return {
      loop: handler,
      cancel,
    };
  }

  protected whenRender(scene: Scene, camera: Camera): void {
    this.renderer?.render(scene, camera);
  }
}
