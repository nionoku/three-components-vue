import { MeshComponent } from '@/components/meshes/mesh';
import {
  AddEquation,
  AlwaysStencilFunc,
  BlendingDstFactor,
  FrontSide,
  KeepStencilOp,
  LessEqualDepth,
  Material as ThreeMaterial,
  MaterialParameters,
  NormalBlending,
  SrcAlphaFactor,
} from 'three';
import { Component } from '@/components/super/component';
import { Prop } from 'vue-property-decorator';

export type MaterialComponent = Pick<ThreeMaterial, 'isMaterial'>

export abstract class BaseMaterial<
    P = unknown, M extends ThreeMaterial = ThreeMaterial
> extends Component<P, M> implements MaterialComponent, MaterialParameters {
  declare public $parent: MeshComponent

  public readonly isMaterial: MaterialComponent['isMaterial'] = true

  @Prop({ type: Number, default: 0 })
  public readonly alphaTest!: NonNullable<MaterialParameters['alphaTest']>

  @Prop({ type: Boolean, default: false })
  public readonly alphaToCoverage!: NonNullable<MaterialParameters['alphaToCoverage']>

  @Prop({ type: Number, default: BlendingDstFactor })
  public readonly blendDst!: NonNullable<MaterialParameters['blendDst']>

  @Prop({ type: Number, default: null })
  public readonly blendDstAlpha!: NonNullable<MaterialParameters['blendDstAlpha']>

  @Prop({ type: Number, default: AddEquation })
  public readonly blendEquation!: NonNullable<MaterialParameters['blendEquation']>

  @Prop({ type: Number, default: null })
  public readonly blendEquationAlpha!: NonNullable<MaterialParameters['blendEquationAlpha']>

  @Prop({ type: Number, default: NormalBlending })
  public readonly blending!: NonNullable<MaterialParameters['blending']>

  @Prop({ type: Number, default: SrcAlphaFactor })
  public readonly blendSrc!: NonNullable<MaterialParameters['blendSrc']>

  @Prop({ type: Number, default: null })
  public readonly blendSrcAlpha!: NonNullable<MaterialParameters['blendSrcAlpha']>

  @Prop({ type: Boolean, default: false })
  public readonly clipIntersection!: NonNullable<MaterialParameters['clipIntersection']>

  // TODO (2022.02.05): Check this type
  @Prop({ type: null, default: null })
  public readonly clippingPlanes!: NonNullable<MaterialParameters['clippingPlanes']>

  @Prop({ type: Boolean, default: false })
  public readonly clipShadows!: NonNullable<MaterialParameters['clipShadows']>

  @Prop({ type: Boolean, default: true })
  public readonly colorWrite!: NonNullable<MaterialParameters['colorWrite']>

  @Prop({ type: Object, default: undefined })
  public readonly defines!: NonNullable<MaterialParameters['defines']>

  @Prop({ type: Number, default: LessEqualDepth })
  public readonly depthFunc!: NonNullable<MaterialParameters['depthFunc']>

  @Prop({ type: Boolean, default: true })
  public readonly depthTest!: NonNullable<MaterialParameters['depthTest']>

  @Prop({ type: Boolean, default: true })
  public readonly depthWrite!: NonNullable<MaterialParameters['depthWrite']>

  @Prop({ type: Boolean, default: false })
  public readonly fog!: NonNullable<MaterialParameters['fog']>

  @Prop({ type: String, default: '' })
  public readonly name!: NonNullable<MaterialParameters['name']>

  @Prop({ type: Boolean, default: false })
  public readonly polygonOffset!: NonNullable<MaterialParameters['polygonOffset']>

  @Prop({ type: Number, default: 0 })
  public readonly polygonOffsetFactor!: NonNullable<MaterialParameters['polygonOffsetFactor']>

  @Prop({ type: Number, default: 0 })
  public readonly polygonOffsetUnits!: NonNullable<MaterialParameters['polygonOffsetUnits']>

  @Prop({ type: String, default: null })
  public readonly precision!: NonNullable<MaterialParameters['precision']>

  @Prop({ type: Boolean, default: false })
  public readonly premultipliedAlpha!: NonNullable<MaterialParameters['premultipliedAlpha']>

  @Prop({ type: Boolean, default: false })
  public readonly dithering!: NonNullable<MaterialParameters['dithering']>

  @Prop({ type: Number, default: FrontSide })
  public readonly side!: NonNullable<MaterialParameters['side']>

  @Prop({ type: Number, default: null })
  public readonly shadowSide!: NonNullable<MaterialParameters['shadowSide']>

  @Prop({ type: Boolean, default: true })
  public readonly toneMapped!: NonNullable<MaterialParameters['toneMapped']>

  @Prop({ type: Boolean, default: false })
  public readonly transparent!: NonNullable<MaterialParameters['transparent']>

  @Prop({ type: Boolean, default: false })
  public readonly vertexColors!: NonNullable<MaterialParameters['vertexColors']>

  @Prop({ type: Boolean, default: true })
  public readonly visible!: NonNullable<MaterialParameters['visible']>

  @Prop({ type: Boolean, default: false })
  public readonly stencilWrite!: NonNullable<MaterialParameters['stencilWrite']>

  @Prop({ type: Number, default: AlwaysStencilFunc })
  public readonly stencilFunc!: NonNullable<MaterialParameters['stencilFunc']>

  @Prop({ type: Number, default: 0 })
  public readonly stencilRef!: NonNullable<MaterialParameters['stencilRef']>

  @Prop({ type: Number, default: 0xFFFFFF })
  public readonly stencilWriteMask!: NonNullable<MaterialParameters['stencilWriteMask']>

  @Prop({ type: Number, default: 0xFFFFFF })
  public readonly stencilFuncMask!: NonNullable<MaterialParameters['stencilFuncMask']>

  @Prop({ type: Number, default: KeepStencilOp })
  public readonly stencilFail!: NonNullable<MaterialParameters['stencilFail']>

  @Prop({ type: Number, default: KeepStencilOp })
  public readonly stencilZFail!: NonNullable<MaterialParameters['stencilZFail']>

  @Prop({ type: Number, default: KeepStencilOp })
  public readonly stencilZPass!: NonNullable<MaterialParameters['stencilZPass']>

  @Prop({ type: Object, default: () => ({}) })
  public readonly userData!: NonNullable<MaterialParameters['userData']>

  /** @deprecated */
  @Prop({ type: Number, default: null })
  public readonly format!: NonNullable<MaterialParameters['format']>

  public created(): void {
    if (!this.$parent.isMesh) {
      throw new Error('Material must be child of Mesh');
    }

    this.$$target = this.createTarget();
    this.$parent.setMaterial(this.$$target);
  }

  public beforeDestroy(): void {
    this.$$target?.dispose();
  }
}
