import {
  MeshBasicMaterial, MeshBasicMaterialParameters, MultiplyOperation,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BaseMaterial } from '../material';

type Props = MeshBasicMaterialParameters

type PropsImpl = Props

@Options({})
export default class BasicMaterial
  extends BaseMaterial<MeshBasicMaterial, Partial<Props>>
  implements PropsImpl {
  @Prop({ type: [Object, Number, String], default: 'white' })
  public readonly color!: PropsImpl['color']

  @Prop({ type: Object, default: null })
  public readonly map!: PropsImpl['map']

  @Prop({ type: Object, default: null })
  public readonly lightMap!: PropsImpl['lightMap']

  @Prop({ type: Number, default: 1 })
  public readonly lightMapIntensity!: PropsImpl['lightMapIntensity']

  @Prop({ type: Object, default: null })
  public readonly aoMap!: PropsImpl['aoMap']

  @Prop({ type: Number, default: 1 })
  public readonly aoMapIntensity!: PropsImpl['aoMapIntensity']

  @Prop({ type: Object, default: null })
  public readonly specularMap!: PropsImpl['specularMap']

  @Prop({ type: Object, default: null })
  public readonly alphaMap!: PropsImpl['alphaMap']

  @Prop({ type: Object, default: null })
  public readonly envMap!: PropsImpl['envMap']

  @Prop({ type: Number, default: MultiplyOperation })
  public readonly combine!: PropsImpl['combine']

  @Prop({ type: Number, default: 1 })
  public readonly reflectivity!: PropsImpl['reflectivity']

  @Prop({ type: Number, default: 0.98 })
  public readonly refractionRatio!: PropsImpl['refractionRatio']

  @Prop({ type: Boolean, default: false })
  public readonly wireframe!: PropsImpl['wireframe']

  @Prop({ type: Number, default: 1 })
  public readonly wireframeLinewidth!: PropsImpl['wireframeLinewidth']

  @Prop({ type: String, default: 'round' })
  public readonly wireframeLinecap!: PropsImpl['wireframeLinecap']

  @Prop({ type: String, default: 'round' })
  public readonly wireframeLinejoin!: PropsImpl['wireframeLinejoin']

  protected createTarget(): MeshBasicMaterial {
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
