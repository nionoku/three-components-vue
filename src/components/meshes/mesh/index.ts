import { Options } from 'vue-class-component';
import { BufferGeometry, Material, Mesh as ThreeMesh } from 'three';
import { ComponentPublicInstance } from 'vue';
import { ComponentWithProps } from '@/types/component';
import { ObjectComponent, SupportsShadowComponent, TransformatableComponent } from '@/types/object3d';
import { Prop } from 'vue-property-decorator';
import { TransformatableComponentImpl } from '@/components/super/object';

export type Props = Partial<SupportsShadowComponent>

export interface MeshComponent extends ComponentPublicInstance, Pick<ThreeMesh, 'isMesh'> {
  setGeometry(geometry: BufferGeometry): void
  setMaterial(material: Material): void
}

@Options({})
export default class Mesh extends TransformatableComponentImpl<Props> implements
    ComponentWithProps<Props>,
    Props,
    MeshComponent {
  declare public $parent: ObjectComponent

  @Prop({ type: Boolean, default: false })
  public readonly castShadow!: NonNullable<Props['castShadow']>;

  @Prop({ type: Boolean, default: false })
  public readonly receiveShadow!: NonNullable<Props['receiveShadow']>;

  public readonly isMesh = true

  protected $$mesh: ThreeMesh | null = null

  protected $$geometry: BufferGeometry | null = null

  protected $$material: Material | null = null

  public created(): void {
    if (!this.$parent.isObject3D) {
      throw new Error('Mesh must be child of Object3D');
    }
  }

  public beforeDestroy(): void {
    this.$$mesh?.removeFromParent();
  }

  public setGeometry(geometry: BufferGeometry): void {
    this.$$geometry = geometry;

    if (this.$$geometry && this.$$material) {
      this.$$mesh = this.createMesh(this.$$geometry, this.$$material);
      this.$parent.add(this.$$mesh);
    }
  }

  public setMaterial(material: Material): void {
    this.$$material = material;

    if (this.$$geometry && this.$$material) {
      this.$$mesh = this.createMesh(this.$$geometry, this.$$material);
      this.$parent.add(this.$$mesh);
    }
  }

  protected createMesh(geometry: BufferGeometry, material: Material): ThreeMesh {
    const mesh = new ThreeMesh(geometry, material);
    this.applyTransforms(mesh);
    mesh.castShadow = this.castShadow;
    mesh.receiveShadow = this.receiveShadow;

    return mesh;
  }
}
