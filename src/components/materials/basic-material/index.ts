import {
  MeshBasicMaterial, MeshBasicMaterialParameters, MultiplyOperation,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Material as BaseMaterial } from '../material';

export type Props = Partial<MeshBasicMaterialParameters>

@Options({})
export default class BasicMaterial extends BaseMaterial<Props, MeshBasicMaterial> implements Props {
  @Prop({ type: [Object, Number, String], default: 'white' })
  public readonly color!: NonNullable<Props['color']>

  @Prop({ type: Number, default: 1 })
  public readonly opacity!: NonNullable<Props['opacity']>

  @Prop({ type: Object, default: null })
  public readonly map!: NonNullable<Props['map']>

  @Prop({ type: Object, default: null })
  public readonly lightMap!: NonNullable<Props['lightMap']>

  @Prop({ type: Number, default: 1 })
  public readonly lightMapIntensity!: NonNullable<Props['lightMapIntensity']>

  @Prop({ type: Object, default: null })
  public readonly aoMap!: NonNullable<Props['aoMap']>

  @Prop({ type: Number, default: 1 })
  public readonly aoMapIntensity!: NonNullable<Props['aoMapIntensity']>

  @Prop({ type: Object, default: null })
  public readonly specularMap!: NonNullable<Props['specularMap']>

  @Prop({ type: Object, default: null })
  public readonly alphaMap!: NonNullable<Props['alphaMap']>

  @Prop({ type: Object, default: null })
  public readonly envMap!: NonNullable<Props['envMap']>

  @Prop({ type: Number, default: MultiplyOperation })
  public readonly combine!: NonNullable<Props['combine']>

  @Prop({ type: Number, default: 1 })
  public readonly reflectivity!: NonNullable<Props['reflectivity']>

  @Prop({ type: Number, default: 0.98 })
  public readonly refractionRatio!: NonNullable<Props['refractionRatio']>

  @Prop({ type: Boolean, default: false })
  public readonly wireframe!: NonNullable<Props['wireframe']>

  @Prop({ type: Number, default: 1 })
  public readonly wireframeLinewidth!: NonNullable<Props['wireframeLinewidth']>

  @Prop({ type: String, default: 'round' })
  public readonly wireframeLinecap!: NonNullable<Props['wireframeLinecap']>

  @Prop({ type: String, default: 'round' })
  public readonly wireframeLinejoin!: NonNullable<Props['wireframeLinejoin']>

  protected createMaterial(): MeshBasicMaterial {
    const geometry = new MeshBasicMaterial({
      color: this.color,
      opacity: this.opacity,
      map: this.map,
      lightMap: this.lightMap,
      lightMapIntensity: this.lightMapIntensity,
      aoMap: this.aoMap,
      aoMapIntensity: this.aoMapIntensity,
      specularMap: this.specularMap,
      alphaMap: this.alphaMap,
      envMap: this.envMap,
      combine: this.combine,
      reflectivity: this.reflectivity,
      refractionRatio: this.refractionRatio,
      wireframe: this.wireframe,
      wireframeLinewidth: this.wireframeLinewidth,
      wireframeLinecap: this.wireframeLinecap,
      wireframeLinejoin: this.wireframeLinejoin,
    });
    return geometry;
  }
}
