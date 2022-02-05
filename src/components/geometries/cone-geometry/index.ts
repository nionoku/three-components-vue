import {
  ConeGeometry as ThreeConeGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BufferGeometry from '../buffer-geometry';

export interface Props {
  radius?: number,
  height?: number,
  radialSegments?: number,
  heightSegments?: number,
  openEnded?: boolean,
  thetaStart?: number,
  thetaLength?: number,
}

@Options({})
export default class ConeGeometry extends BufferGeometry<Props> implements Required<Props> {
  @Prop({ type: Number, default: 1 })
  public readonly radius!: NonNullable<Props['radius']>;

  @Prop({ type: Number, default: 1 })
  public readonly height!: NonNullable<Props['height']>;

  @Prop({ type: Number, default: 8 })
  public readonly radialSegments!: NonNullable<Props['radialSegments']>;

  @Prop({ type: Number, default: 1 })
  public readonly heightSegments!: NonNullable<Props['heightSegments']>;

  @Prop({ type: Boolean, default: false })
  public readonly openEnded!: NonNullable<Props['openEnded']>;

  @Prop({ type: Number, default: 0 })
  public readonly thetaStart!: NonNullable<Props['thetaStart']>;

  @Prop({ type: Number, default: Math.PI * 2 })
  public readonly thetaLength!: NonNullable<Props['thetaLength']>;

  protected createTarget(): ThreeConeGeometry {
    const geometry = new ThreeConeGeometry(
      this.radius, this.height, this.radialSegments, this.heightSegments,
      this.openEnded, this.thetaStart, this.thetaLength,
    );
    return geometry;
  }
}
