import {
  TorusGeometry as ThreeTorusGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BufferGeometry from '../buffer-geometry';

type Props = ThreeTorusGeometry['parameters']

type PropsImpl = Props

@Options({})
export default class TorusGeometry
  extends BufferGeometry<Partial<Props>>
  implements PropsImpl {
  @Prop({ type: Number, default: 1 })
  public readonly radius!: PropsImpl['radius'];

  @Prop({ type: Number, default: 0.4 })
  public readonly tube!: PropsImpl['tube'];

  @Prop({ type: Number, default: 8 })
  public readonly radialSegments!: PropsImpl['radialSegments'];

  @Prop({ type: Number, default: 6 })
  public readonly tubularSegments!: PropsImpl['tubularSegments'];

  @Prop({ type: Number, default: Math.PI * 2 })
  public readonly arc!: PropsImpl['arc'];

  protected createTarget(): ThreeTorusGeometry {
    const geometry = new ThreeTorusGeometry(
      this.radius, this.tube, this.radialSegments,
      this.tubularSegments, this.arc,
    );
    return geometry;
  }
}
