import { MeshComponent } from '@/components/meshes/mesh';
import {
  AddEquation,
  AlwaysStencilFunc,
  FrontSide,
  KeepStencilOp,
  LessEqualDepth,
  Material as ThreeMaterial,
  MaterialParameters,
  NormalBlending,
  OneMinusSrcAlphaFactor,
  SrcAlphaFactor,
} from 'three';
import { Component } from '@/components/core/component';
import { Prop } from 'vue-property-decorator';

type Props = MaterialParameters

export type MaterialComponent = Pick<ThreeMaterial, 'isMaterial'>

type PropsImpl = Props

export abstract class BaseMaterial<M extends ThreeMaterial, P = Record<string, unknown>>
  extends Component<M, P & Partial<Props>>
  implements PropsImpl, MaterialComponent {
  declare public $parent: MeshComponent

  public readonly isMaterial: MaterialComponent['isMaterial'] = true

  @Prop({ type: Number, default: 1 })
  public readonly opacity!: PropsImpl['opacity']

  @Prop({ type: Number, default: 0 })
  public readonly alphaTest!: PropsImpl['alphaTest']

  @Prop({ type: Boolean, default: false })
  public readonly alphaToCoverage!: PropsImpl['alphaToCoverage']

  @Prop({ type: Number, default: OneMinusSrcAlphaFactor })
  public readonly blendDst!: PropsImpl['blendDst']

  @Prop({ type: Number, default: null })
  public readonly blendDstAlpha!: PropsImpl['blendDstAlpha']

  @Prop({ type: Number, default: AddEquation })
  public readonly blendEquation!: PropsImpl['blendEquation']

  @Prop({ type: Number, default: null })
  public readonly blendEquationAlpha!: PropsImpl['blendEquationAlpha']

  @Prop({ type: Number, default: NormalBlending })
  public readonly blending!: PropsImpl['blending']

  @Prop({ type: Number, default: SrcAlphaFactor })
  public readonly blendSrc!: PropsImpl['blendSrc']

  @Prop({ type: Number, default: null })
  public readonly blendSrcAlpha!: PropsImpl['blendSrcAlpha']

  @Prop({ type: Boolean, default: false })
  public readonly clipIntersection!: PropsImpl['clipIntersection']

  // TODO (2022.02.05): Check this type
  @Prop({ type: null, default: null })
  public readonly clippingPlanes!: PropsImpl['clippingPlanes']

  @Prop({ type: Boolean, default: false })
  public readonly clipShadows!: PropsImpl['clipShadows']

  @Prop({ type: Boolean, default: true })
  public readonly colorWrite!: PropsImpl['colorWrite']

  @Prop({ type: Object, default: {} })
  public readonly defines!: PropsImpl['defines']

  @Prop({ type: Number, default: LessEqualDepth })
  public readonly depthFunc!: PropsImpl['depthFunc']

  @Prop({ type: Boolean, default: true })
  public readonly depthTest!: PropsImpl['depthTest']

  @Prop({ type: Boolean, default: true })
  public readonly depthWrite!: PropsImpl['depthWrite']

  @Prop({ type: Boolean, default: false })
  public readonly fog!: PropsImpl['fog']

  @Prop({ type: String, default: '' })
  public readonly name!: PropsImpl['name']

  @Prop({ type: Boolean, default: false })
  public readonly polygonOffset!: PropsImpl['polygonOffset']

  @Prop({ type: Number, default: 0 })
  public readonly polygonOffsetFactor!: PropsImpl['polygonOffsetFactor']

  @Prop({ type: Number, default: 0 })
  public readonly polygonOffsetUnits!: PropsImpl['polygonOffsetUnits']

  @Prop({ type: String, default: null })
  public readonly precision!: PropsImpl['precision']

  @Prop({ type: Boolean, default: false })
  public readonly premultipliedAlpha!: PropsImpl['premultipliedAlpha']

  @Prop({ type: Boolean, default: false })
  public readonly dithering!: PropsImpl['dithering']

  @Prop({ type: Number, default: FrontSide })
  public readonly side!: PropsImpl['side']

  @Prop({ type: Number, default: null })
  public readonly shadowSide!: PropsImpl['shadowSide']

  @Prop({ type: Boolean, default: true })
  public readonly toneMapped!: PropsImpl['toneMapped']

  @Prop({ type: Boolean, default: false })
  public readonly transparent!: PropsImpl['transparent']

  @Prop({ type: Boolean, default: false })
  public readonly vertexColors!: PropsImpl['vertexColors']

  @Prop({ type: Boolean, default: true })
  public readonly visible!: PropsImpl['visible']

  @Prop({ type: Boolean, default: false })
  public readonly stencilWrite!: PropsImpl['stencilWrite']

  @Prop({ type: Number, default: AlwaysStencilFunc })
  public readonly stencilFunc!: PropsImpl['stencilFunc']

  @Prop({ type: Number, default: 0 })
  public readonly stencilRef!: PropsImpl['stencilRef']

  @Prop({ type: Number, default: 0xFFFFFF })
  public readonly stencilWriteMask!: PropsImpl['stencilWriteMask']

  @Prop({ type: Number, default: 0xFFFFFF })
  public readonly stencilFuncMask!: PropsImpl['stencilFuncMask']

  @Prop({ type: Number, default: KeepStencilOp })
  public readonly stencilFail!: PropsImpl['stencilFail']

  @Prop({ type: Number, default: KeepStencilOp })
  public readonly stencilZFail!: PropsImpl['stencilZFail']

  @Prop({ type: Number, default: KeepStencilOp })
  public readonly stencilZPass!: PropsImpl['stencilZPass']

  @Prop({ type: Object, default: () => ({}) })
  public readonly userData!: PropsImpl['userData']

  /** @deprecated */
  @Prop({ type: Number, default: null })
  public readonly format!: PropsImpl['format']

  public beforeDestroy(): void {
    this.$$target?.dispose();
  }
}
