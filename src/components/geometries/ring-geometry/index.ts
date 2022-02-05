import {
  RingGeometry as ThreeRingGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BufferGeometry from '../buffer-geometry';

export type Props = Partial<ThreeRingGeometry['parameters']>

export type RingGeometryComponent = Pick<ThreeRingGeometry, 'isBufferGeometry'>

@Options({})
export default class RingGeometry extends BufferGeometry<Props> implements
    Required<Props>,
    RingGeometryComponent {
  @Prop({ type: Number, default: 0.5 })
  public readonly innerRadius!: NonNullable<Props['innerRadius']>;

  @Prop({ type: Number, default: 1 })
  public readonly outerRadius!: NonNullable<Props['outerRadius']>;

  @Prop({ type: Number, default: 8 })
  public readonly thetaSegments!: NonNullable<Props['thetaSegments']>;

  @Prop({ type: Number, default: 1 })
  public readonly phiSegments!: NonNullable<Props['phiSegments']>;

  @Prop({ type: Number, default: 0 })
  public readonly thetaStart!: NonNullable<Props['thetaStart']>;

  @Prop({ type: Number, default: Math.PI * 2 })
  public readonly thetaLength!: NonNullable<Props['thetaLength']>;

  protected createTarget(): ThreeRingGeometry {
    const geometry = new ThreeRingGeometry(
      this.innerRadius, this.outerRadius, this.thetaSegments,
      this.phiSegments, this.thetaStart, this.thetaLength,
    );
    return geometry;
  }
}
