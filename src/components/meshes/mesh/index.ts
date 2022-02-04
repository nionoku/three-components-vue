import { Options, Vue } from 'vue-class-component';
import { BufferGeometry, Material, Mesh as ThreeMesh } from 'three';
import { ComponentPublicInstance } from 'vue';
import { ComponentWithProps } from '@/types/component';
import { ObjectComponent, SupportsShadowComponent } from '@/types/object3d';
import { Prop } from 'vue-property-decorator';

type Props = SupportsShadowComponent

export interface MeshComponent extends ComponentPublicInstance, Pick<ThreeMesh, 'isMesh'> {
  setGeometry(geometry: BufferGeometry): void
  setMaterial(material: Material): void
}

@Options({})
export default class Mesh extends Vue implements ComponentWithProps<Props>, Props, MeshComponent {
  declare public $parent: ObjectComponent

  declare public $props: Props

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

    // TODO (2022.02.04): Supports create mesh without geometry
    if (!this.$$geometry) {
      throw new Error('Can not create mesh. Geometry is null');
    }

    // TODO (2022.02.04): Supports create mesh without material
    if (!this.$$material) {
      throw new Error('Can not create mesh. Material is null');
    }

    this.$$mesh = this.createMesh(this.$$geometry, this.$$material);
    this.$parent.add(this.$$mesh);
  }

  public beforeDestroy(): void {
    this.$$mesh?.removeFromParent();
  }

  // FIXME (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }

  public setGeometry(geometry: BufferGeometry): void {
    this.$$geometry = geometry;
  }

  public setMaterial(material: Material): void {
    this.$$material = material;
  }

  protected createMesh(geometry: BufferGeometry, material: Material): ThreeMesh {
    const mesh = new ThreeMesh(geometry, material);
    mesh.castShadow = this.castShadow;
    mesh.receiveShadow = this.receiveShadow;

    return mesh;
  }
}
