import {
  BoxGeometry as ThreeBoxGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BufferGeometry from '../buffer-geometry';

export type Props = Partial<ThreeBoxGeometry['parameters']>

export type BoxGeometryComponent = Pick<ThreeBoxGeometry, 'isBufferGeometry'>

@Options({})
export default class BoxGeometry extends BufferGeometry<Props> implements
    Required<Props>,
    BoxGeometryComponent {
  @Prop({ type: Number, default: 1 })
  public readonly width!: NonNullable<Props['width']>;

  @Prop({ type: Number, default: 1 })
  public readonly height!: NonNullable<Props['height']>;

  @Prop({ type: Number, default: 1 })
  public readonly depth!: NonNullable<Props['depth']>;

  @Prop({ type: Number, default: 1 })
  public readonly widthSegments!: NonNullable<Props['widthSegments']>;

  @Prop({ type: Number, default: 1 })
  public readonly heightSegments!: NonNullable<Props['heightSegments']>;

  @Prop({ type: Number, default: 1 })
  public readonly depthSegments!: NonNullable<Props['depthSegments']>;

  protected createTarget(): ThreeBoxGeometry {
    const geometry = new ThreeBoxGeometry(
      this.width, this.height, this.depth,
      this.widthSegments, this.heightSegments, this.depthSegments,
    );
    return geometry;
  }
}
