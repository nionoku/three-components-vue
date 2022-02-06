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

type Props = MeshStandardMaterialParameters

type PropsImpl = Props

@Options({})
export default class StandartMaterial
  extends BaseMaterial<MeshStandardMaterial, Partial<Props>>
  implements PropsImpl {
  @Prop({ type: Number, default: 1 })
  public readonly roughness!: PropsImpl['roughness']

  @Prop({ type: Number, default: 0 })
  public readonly metalness!: PropsImpl['metalness']

  @Prop({ type: Object, default: () => new Color(0x000000) })
  public readonly emissive!: PropsImpl['emissive']

  @Prop({ type: Number, default: 1 })
  public readonly emissiveIntensity!: PropsImpl['emissiveIntensity']

  @Prop({ type: Object, default: null })
  public readonly emissiveMap!: PropsImpl['emissiveMap']

  @Prop({ type: Object, default: null })
  public readonly bumpMap!: PropsImpl['bumpMap']

  @Prop({ type: Number, default: 1 })
  public readonly bumpScale!: PropsImpl['bumpScale']

  @Prop({ type: Object, default: null })
  public readonly normalMap!: PropsImpl['normalMap']

  @Prop({ type: Object, default: TangentSpaceNormalMap })
  public readonly normalMapType!: PropsImpl['normalMapType']

  @Prop({ type: Object, default: () => new Vector2(1, 1) })
  public readonly normalScale!: PropsImpl['normalScale']

  @Prop({ type: Object, default: null })
  public readonly displacementMap!: PropsImpl['displacementMap']

  @Prop({ type: Number, default: 1 })
  public readonly displacementScale!: PropsImpl['displacementScale']

  @Prop({ type: Number, default: 0 })
  public readonly displacementBias!: PropsImpl['displacementBias']

  @Prop({ type: Object, default: null })
  public readonly roughnessMap!: PropsImpl['roughnessMap']

  @Prop({ type: Object, default: null })
  public readonly metalnessMap!: PropsImpl['metalnessMap']

  @Prop({ type: Number, default: 1 })
  public readonly envMapIntensity!: PropsImpl['envMapIntensity']

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
  public readonly alphaMap!: PropsImpl['alphaMap']

  @Prop({ type: Object, default: null })
  public readonly envMap!: PropsImpl['envMap']

  @Prop({ type: Number, default: 0.98 })
  public readonly refractionRatio!: PropsImpl['refractionRatio']

  @Prop({ type: Boolean, default: false })
  public readonly wireframe!: PropsImpl['wireframe']

  @Prop({ type: Number, default: 1 })
  public readonly wireframeLinewidth!: PropsImpl['wireframeLinewidth']

  @Prop({ type: Boolean, default: false })
  public readonly flatShading!: PropsImpl['flatShading']

  protected createTarget(): MeshStandardMaterial {
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
