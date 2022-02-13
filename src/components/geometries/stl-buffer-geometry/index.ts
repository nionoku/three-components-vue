import {
  BufferGeometry as ThreeBufferGeometry, LoadingManager,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { nextTick } from 'vue';
import { Geometry } from '../geometry';

interface Props {
  path: string
  manager: LoadingManager
  whenLoad: (geometry: ThreeBufferGeometry) => void
  whenProgress: (event: ProgressEvent<EventTarget>) => void
  whenError: (error: ErrorEvent) => void
}

interface PropsImpl extends Omit<Props, 'whenLoad' | 'whenProgress' | 'whenError'> {
  whenLoad: Props['whenLoad'] | null
  whenProgress: Props['whenProgress'] | null
  whenError: Props['whenError'] | null
}

export type STLBufferGeometryComponent = Pick<ThreeBufferGeometry, 'isBufferGeometry'>

@Options({})
export default class STLBufferGeometry
  extends Geometry<ThreeBufferGeometry, Partial<Props>>
  implements STLBufferGeometryComponent, PropsImpl {
  @Prop({ type: String, required: true })
  public readonly path!: PropsImpl['path'];

  @Prop({ type: Object, default: () => new LoadingManager() })
  public readonly manager!: PropsImpl['manager'];

  @Prop({ type: Function, default: null })
  public readonly whenLoad!: PropsImpl['whenLoad'];

  @Prop({ type: Function, default: null })
  public readonly whenProgress!: PropsImpl['whenProgress'];

  @Prop({ type: Function, default: null })
  public readonly whenError!: PropsImpl['whenError'];

  public readonly isBufferGeometry: STLBufferGeometryComponent['isBufferGeometry'] = true;

  @Watch('path', { immediate: true })
  protected whenPathChanged(value: string): void {
    nextTick(async () => {
      try {
        if (!this.$parent.isMesh) {
          throw new Error('STLBufferGeometry must be child of Mesh');
        }

        if (!value) {
          throw new Error('STLBufferGeometry must take in "path"');
        }

        this.beforeDestroy();
        this.$$target = await this.createTarget(value);
        this.whenLoad?.(this.$$target);
        this.$parent.setGeometry(this.$$target);
      } catch (err) {
        this.whenError?.(err as ErrorEvent);
      }
    });
  }

  protected async createTarget(path: string): Promise<ThreeBufferGeometry> {
    const loader = new STLLoader(this.manager);
    const geometry = await loader.loadAsync(path, this.whenProgress || undefined);
    return geometry;
  }

  public beforeDestroy(): void {
    this.$$target?.dispose();
  }
}
