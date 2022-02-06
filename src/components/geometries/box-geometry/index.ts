import {
  BoxGeometry as ThreeBoxGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BufferGeometry from '../buffer-geometry';

type Props = ThreeBoxGeometry['parameters']

type PropsImpl = Props

@Options({})
export default class BoxGeometry extends BufferGeometry<Partial<Props>> implements PropsImpl {
@Prop({ type: Number, default: 1 })
  public readonly width!: PropsImpl['width'];

  @Prop({ type: Number, default: 1 })
  public readonly height!: PropsImpl['height'];

  @Prop({ type: Number, default: 1 })
  public readonly depth!: PropsImpl['depth'];

  @Prop({ type: Number, default: 1 })
  public readonly widthSegments!: PropsImpl['widthSegments'];

  @Prop({ type: Number, default: 1 })
  public readonly heightSegments!: PropsImpl['heightSegments'];

  @Prop({ type: Number, default: 1 })
  public readonly depthSegments!: PropsImpl['depthSegments'];

  protected createTarget(): ThreeBoxGeometry {
    const geometry = new ThreeBoxGeometry(
      this.width, this.height, this.depth,
      this.widthSegments, this.heightSegments, this.depthSegments,
    );
    return geometry;
  }
}
