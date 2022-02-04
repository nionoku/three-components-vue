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

  public created(): void {
    if (!this.$parent.isObject3D) {
      throw new Error('Mesh must be child of Object3D');
    }

    this.$$mesh = new ThreeMesh();
    this.$parent.add(this.$$mesh);
  }

  public beforeDestroy(): void {
    this.$$mesh?.removeFromParent();
  }

  public setGeometry(geometry: BufferGeometry): void {
    if (!this.$$mesh) {
      throw new Error('Mesh is not ready so geometry can not be added to it');
    }

    this.$$mesh.geometry = geometry;
  }

  public setMaterial(material: Material): void {
    if (!this.$$mesh) {
      throw new Error('Mesh is not ready so material can not be addedto it');
    }

    this.$$mesh.material = material;
  }
}
