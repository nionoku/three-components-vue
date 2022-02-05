import {
  Color,
  MeshStandardMaterial,
  MeshStandardMaterialParameters,
  TangentSpaceNormalMap,
  Vector2,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BaseMaterial } from '../material';

export type Props = Partial<MeshStandardMaterialParameters>

@Options({})
export default class StandartMaterial extends BaseMaterial<Props, MeshStandardMaterial> implements
    Required<Props> {
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

  @Prop({ type: Boolean, default: false })
  public readonly flatShading!: NonNullable<Props['flatShading']>

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
      alphaTest: this.alphaTest,
      alphaToCoverage: this.alphaToCoverage,
      blendDst: this.blendDst,
      blendDstAlpha: this.blendDstAlpha,
      blendEquation: this.blendEquation,
      blendEquationAlpha: this.blendEquationAlpha,
      blending: this.blending,
      blendSrc: this.blendSrc,
      blendSrcAlpha: this.blendSrcAlpha,
      clipIntersection: this.clipIntersection,
      clippingPlanes: this.clippingPlanes,
      clipShadows: this.clipShadows,
      colorWrite: this.colorWrite,
      defines: this.defines,
      depthFunc: this.depthFunc,
      depthTest: this.depthTest,
      depthWrite: this.depthWrite,
      fog: this.fog,
      name: this.name,
      polygonOffset: this.polygonOffset,
      polygonOffsetFactor: this.polygonOffsetFactor,
      polygonOffsetUnits: this.polygonOffsetUnits,
      precision: this.precision,
      premultipliedAlpha: this.premultipliedAlpha,
      dithering: this.dithering,
      side: this.side,
      shadowSide: this.shadowSide,
      toneMapped: this.toneMapped,
      transparent: this.transparent,
      vertexColors: this.vertexColors,
      visible: this.visible,
      format: this.format,
      stencilWrite: this.stencilWrite,
      stencilFunc: this.stencilFunc,
      stencilRef: this.stencilRef,
      stencilWriteMask: this.stencilWriteMask,
      stencilFuncMask: this.stencilFuncMask,
      stencilFail: this.stencilFail,
      stencilZFail: this.stencilZFail,
      stencilZPass: this.stencilZPass,
      userData: this.userData,
      flatShading: this.flatShading,
    });
    return material;
  }
}
