import {
  ConeGeometry as ThreeConeGeometry,
  CylinderGeometry as ThreeCylinderGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BufferGeometry from '../buffer-geometry';

interface Props extends Omit<ThreeCylinderGeometry['parameters'], 'radiusTop' | 'radiusBottom'> {
  radius: number,
}

type PropsImpl = Props

@Options({})
export default class ConeGeometry
  extends BufferGeometry<Partial<Props>>
  implements PropsImpl {
  @Prop({ type: Number, default: 1 })
  public readonly radius!: PropsImpl['radius']

  @Prop({ type: Number, default: 1 })
  public readonly height!: PropsImpl['height']

  @Prop({ type: Number, default: 8 })
  public readonly radialSegments!: PropsImpl['radialSegments']

  @Prop({ type: Number, default: 1 })
  public readonly heightSegments!: PropsImpl['heightSegments']

  @Prop({ type: Boolean, default: false })
  public readonly openEnded!: PropsImpl['openEnded']

  @Prop({ type: Number, default: 0 })
  public readonly thetaStart!: PropsImpl['thetaStart']

  @Prop({ type: Number, default: Math.PI * 2 })
  public readonly thetaLength!: PropsImpl['thetaLength']

  protected createTarget(): ThreeConeGeometry {
    const geometry = new ThreeConeGeometry(
      this.radius, this.height, this.radialSegments, this.heightSegments,
      this.openEnded, this.thetaStart, this.thetaLength,
    );
    return geometry;
  }
}
