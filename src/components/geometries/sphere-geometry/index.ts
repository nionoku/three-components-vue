import {
  SphereGeometry as ThreeSphereGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BufferGeometry from '../buffer-geometry';

export type Props = Partial<ThreeSphereGeometry['parameters']>

@Options({})
export default class SphereGeometry extends BufferGeometry<Props> implements Required<Props> {
  @Prop({ type: Number, default: 50 })
  public readonly radius!: NonNullable<Props['radius']>;

  @Prop({ type: Number, default: 8 })
  public readonly widthSegments!: NonNullable<Props['widthSegments']>;

  @Prop({ type: Number, default: 6 })
  public readonly heightSegments!: NonNullable<Props['heightSegments']>;

  @Prop({ type: Number, default: 0 })
  public readonly phiStart!: NonNullable<Props['phiStart']>;

  @Prop({ type: Number, default: Math.PI * 2 })
  public readonly phiLength!: NonNullable<Props['phiLength']>;

  @Prop({ type: Number, default: 0 })
  public readonly thetaStart!: NonNullable<Props['thetaStart']>;

  @Prop({ type: Number, default: Math.PI * 2 })
  public readonly thetaLength!: NonNullable<Props['thetaLength']>;

  protected createTarget(): ThreeSphereGeometry {
    const geometry = new ThreeSphereGeometry(
      this.radius, this.widthSegments, this.heightSegments,
      this.phiStart, this.phiLength, this.thetaStart, this.thetaLength,
    );
    return geometry;
  }
}
