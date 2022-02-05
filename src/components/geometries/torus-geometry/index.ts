import {
  TorusGeometry as ThreeTorusGeometry,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BufferGeometry from '../buffer-geometry';

export type Props = Partial<ThreeTorusGeometry['parameters']>

@Options({})
export default class TorusGeometry extends BufferGeometry<Props> implements Required<Props> {
  @Prop({ type: Number, default: 1 })
  public readonly radius!: NonNullable<Props['radius']>;

  @Prop({ type: Number, default: 0.4 })
  public readonly tube!: NonNullable<Props['tube']>;

  @Prop({ type: Number, default: 8 })
  public readonly radialSegments!: NonNullable<Props['radialSegments']>;

  @Prop({ type: Number, default: 6 })
  public readonly tubularSegments!: NonNullable<Props['tubularSegments']>;

  @Prop({ type: Number, default: Math.PI * 2 })
  public readonly arc!: NonNullable<Props['arc']>;

  protected createTarget(): ThreeTorusGeometry {
    const geometry = new ThreeTorusGeometry(
      this.radius, this.tube, this.radialSegments,
      this.tubularSegments, this.arc,
    );
    return geometry;
  }
}
