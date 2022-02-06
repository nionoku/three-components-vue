import {
  RingGeometry as ThreeRingGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BufferGeometry from '../buffer-geometry';

type Props = ThreeRingGeometry['parameters']

type PropsImpl = Props

@Options({})
export default class RingGeometry
  extends BufferGeometry<Partial<Props>>
  implements PropsImpl {
  @Prop({ type: Number, default: 0.5 })
  public readonly innerRadius!: PropsImpl['innerRadius'];

  @Prop({ type: Number, default: 1 })
  public readonly outerRadius!: PropsImpl['outerRadius'];

  @Prop({ type: Number, default: 8 })
  public readonly thetaSegments!: PropsImpl['thetaSegments'];

  @Prop({ type: Number, default: 1 })
  public readonly phiSegments!: PropsImpl['phiSegments'];

  @Prop({ type: Number, default: 0 })
  public readonly thetaStart!: PropsImpl['thetaStart'];

  @Prop({ type: Number, default: Math.PI * 2 })
  public readonly thetaLength!: PropsImpl['thetaLength'];

  protected createTarget(): ThreeRingGeometry {
    const geometry = new ThreeRingGeometry(
      this.innerRadius, this.outerRadius, this.thetaSegments,
      this.phiSegments, this.thetaStart, this.thetaLength,
    );
    return geometry;
  }
}
