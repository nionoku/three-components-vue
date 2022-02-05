import {
  MeshBasicMaterial, MeshBasicMaterialParameters, MultiplyOperation,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BaseMaterial } from '../material';

export type Props = Partial<MeshBasicMaterialParameters>

@Options({})
export default class BasicMaterial extends BaseMaterial<Props, MeshBasicMaterial> implements
    Required<Props> {
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
      format: this.format,
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
      stencilWrite: this.stencilWrite,
      stencilFunc: this.stencilFunc,
      stencilRef: this.stencilRef,
      stencilWriteMask: this.stencilWriteMask,
      stencilFuncMask: this.stencilFuncMask,
      stencilFail: this.stencilFail,
      stencilZFail: this.stencilZFail,
      stencilZPass: this.stencilZPass,
      userData: this.userData,
    });
    return geometry;
  }
}
