import { Options } from 'vue-class-component';
import {
  BufferGeometry, Material, Mesh as ThreeMesh,
} from 'three';
import { ComponentPublicInstance } from 'vue';
import { ObjectComponent, SupportsShadowComponent } from '@/types/object3d';
import { Prop } from 'vue-property-decorator';
import { TransformatableComponentImpl } from '@/components/super/object';

export type Props = Partial<SupportsShadowComponent>

export interface MeshComponent extends ComponentPublicInstance, Pick<ThreeMesh, 'isMesh'> {
  setGeometry(geometry: BufferGeometry): void
  setMaterial(material: Material): void
}

@Options({})
export default class Mesh extends TransformatableComponentImpl<Props, ThreeMesh> implements
    Required<Props>,
    MeshComponent {
  declare public $parent: ObjectComponent

  @Prop({ type: Boolean, default: false })
  public readonly castShadow!: NonNullable<Props['castShadow']>;

  @Prop({ type: Boolean, default: false })
  public readonly receiveShadow!: NonNullable<Props['receiveShadow']>;

  public readonly isMesh = true

  public created(): void {
    if (!this.$parent.isObject3D) {
      throw new Error('Mesh must be child of Object3D');
    }

    this.$$target = this.createTarget();
    this.applyTransforms();
    this.$parent.add(this.$$target);
  }

  public beforeDestroy(): void {
    this.$$target?.removeFromParent();
  }

  public setGeometry(geometry: BufferGeometry): void {
    if (!this.$$target) {
      throw new Error('Mesh is not ready so geometry can not be added to it');
    }

    this.$$target.geometry = geometry;
  }

  public setMaterial(material: Material): void {
    if (!this.$$target) {
      throw new Error('Mesh is not ready so material can not be addedto it');
    }

    this.$$target.material = material;
  }

  protected createTarget(): ThreeMesh {
    const mesh = new ThreeMesh();
    return mesh;
  }
}
