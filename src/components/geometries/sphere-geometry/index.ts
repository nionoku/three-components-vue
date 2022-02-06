import {
  SphereGeometry as ThreeSphereGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BufferGeometry from '../buffer-geometry';

type Props = ThreeSphereGeometry['parameters']

type PropsImpl = Props

@Options({})
export default class SphereGeometry
  extends BufferGeometry<Partial<Props>>
  implements PropsImpl {
  @Prop({ type: Number, default: 50 })
  public readonly radius!: PropsImpl['radius'];

  @Prop({ type: Number, default: 8 })
  public readonly widthSegments!: PropsImpl['widthSegments'];

  @Prop({ type: Number, default: 6 })
  public readonly heightSegments!: PropsImpl['heightSegments'];

  @Prop({ type: Number, default: 0 })
  public readonly phiStart!: PropsImpl['phiStart'];

  @Prop({ type: Number, default: Math.PI * 2 })
  public readonly phiLength!: PropsImpl['phiLength'];

  @Prop({ type: Number, default: 0 })
  public readonly thetaStart!: PropsImpl['thetaStart'];

  @Prop({ type: Number, default: Math.PI * 2 })
  public readonly thetaLength!: PropsImpl['thetaLength'];

  protected createTarget(): ThreeSphereGeometry {
    const geometry = new ThreeSphereGeometry(
      this.radius, this.widthSegments, this.heightSegments,
      this.phiStart, this.phiLength, this.thetaStart, this.thetaLength,
    );
    return geometry;
  }
}
