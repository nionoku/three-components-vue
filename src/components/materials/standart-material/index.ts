import {
  Color,
  MeshStandardMaterial,
  MeshStandardMaterialParameters,
  TangentSpaceNormalMap,
  Vector2,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Material as BaseMaterial } from '../material';

export type Props = Partial<MeshStandardMaterialParameters>

@Options({})
export default class StandartMaterial extends BaseMaterial<Props, MeshStandardMaterial> implements
    Props {
  @Prop({ type: Number, default: 1 })
  public readonly roughness!: NonNullable<Props['roughness']>

  @Prop({ type: Number, default: 0 })
  public readonly metalness!: NonNullable<Props['metalness']>

  @Prop({ type: Object, default: () => new Color(0x000000) })
  public readonly emissive!: NonNullable<Props['emissive']>

  @Prop({ type: Number, default: 1 })
  public readonly emissiveIntensity!: NonNullable<Props['emissiveIntensity']>

  @Prop({ type: Object, default: null })
  public readonly emissiveMap!: NonNullable<Props['emissiveMap']>

  @Prop({ type: Object, default: null })
  public readonly bumpMap!: NonNullable<Props['bumpMap']>

  @Prop({ type: Number, default: 1 })
  public readonly bumpScale!: NonNullable<Props['bumpScale']>

  @Prop({ type: Object, default: null })
  public readonly normalMap!: NonNullable<Props['normalMap']>

  @Prop({ type: Object, default: TangentSpaceNormalMap })
  public readonly normalMapType!: NonNullable<Props['normalMapType']>

  @Prop({ type: Object, default: () => new Vector2(1, 1) })
  public readonly normalScale!: NonNullable<Props['normalScale']>

  @Prop({ type: Object, default: null })
  public readonly displacementMap!: NonNullable<Props['displacementMap']>

  @Prop({ type: Number, default: 1 })
  public readonly displacementScale!: NonNullable<Props['displacementScale']>

  @Prop({ type: Number, default: 0 })
  public readonly displacementBias!: NonNullable<Props['displacementBias']>

  @Prop({ type: Object, default: null })
  public readonly roughnessMap!: NonNullable<Props['roughnessMap']>

  @Prop({ type: Object, default: null })
  public readonly metalnessMap!: NonNullable<Props['metalnessMap']>

  @Prop({ type: Number, default: 1 })
  public readonly envMapIntensity!: NonNullable<Props['envMapIntensity']>

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
  public readonly alphaMap!: NonNullable<Props['alphaMap']>

  @Prop({ type: Object, default: null })
  public readonly envMap!: NonNullable<Props['envMap']>

  @Prop({ type: Number, default: 0.98 })
  public readonly refractionRatio!: NonNullable<Props['refractionRatio']>

  @Prop({ type: Boolean, default: false })
  public readonly wireframe!: NonNullable<Props['wireframe']>

  @Prop({ type: Number, default: 1 })
  public readonly wireframeLinewidth!: NonNullable<Props['wireframeLinewidth']>

  protected createMaterial(): MeshStandardMaterial {
    const material = new MeshStandardMaterial({
      roughness: this.roughness,
      metalness: this.metalness,
      emissive: this.emissive,
      emissiveIntensity: this.emissiveIntensity,
      emissiveMap: this.emissiveMap,
      bumpMap: this.bumpMap,
      bumpScale: this.bumpScale,
      normalMap: this.normalMap,
      normalMapType: this.normalMapType,
      normalScale: this.normalScale,
      displacementMap: this.displacementMap,
      displacementScale: this.displacementScale,
      displacementBias: this.displacementBias,
      roughnessMap: this.roughnessMap,
      metalnessMap: this.metalnessMap,
      envMapIntensity: this.envMapIntensity,
      color: this.color,
      opacity: this.opacity,
      map: this.map,
      lightMap: this.lightMap,
      lightMapIntensity: this.lightMapIntensity,
      aoMap: this.aoMap,
      aoMapIntensity: this.aoMapIntensity,
      alphaMap: this.alphaMap,
      envMap: this.envMap,
      refractionRatio: this.refractionRatio,
      wireframe: this.wireframe,
      wireframeLinewidth: this.wireframeLinewidth,
    });
    return material;
  }
}
