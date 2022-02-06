import { Options } from 'vue-class-component';
import {
  BufferGeometry, Material, Mesh as ThreeMesh,
} from 'three';
import { ComponentPublicInstance } from 'vue';
import { ObjectComponent as ParentObjectComponent, SupportsShadowComponent } from '@/types/object3d';
import { Prop } from 'vue-property-decorator';
import { MouseEventMap } from '@/types/events/mouse';
import { IntersectionEventHandler } from '@/types/events';
import { ObjectComponent } from '@/components/super/object';

interface Props extends SupportsShadowComponent {
  whenClick: (mesh: ThreeMesh) => void
}

export interface MeshComponent extends ComponentPublicInstance, Pick<ThreeMesh, 'isMesh'> {
  setGeometry(geometry: BufferGeometry): void
  setMaterial(material: Material): void
}

interface PropsImpl extends Omit<Props, 'whenClick'> {
  whenClick: Props['whenClick'] | null
}

@Options({})
export default class Mesh extends ObjectComponent<Partial<Props>, ThreeMesh> implements
    PropsImpl,
    MeshComponent {
  declare public $parent: ParentObjectComponent

  @Prop({ type: Boolean, default: false })
  public readonly castShadow!: PropsImpl['castShadow'];

  @Prop({ type: Boolean, default: false })
  public readonly receiveShadow!: PropsImpl['receiveShadow'];

  @Prop({ type: Function, default: null })
  public readonly whenClick!: PropsImpl['whenClick'];

  public readonly isMesh = true

  public created(): void {
    if (!this.$parent.isObject3D) {
      throw new Error('Mesh must be child of Object3D');
    }

    this.$$target = this.createTarget();
    this.applyTransforms();
    this.$parent.add(this.$$target);
  }

  public mounted(): void {
    this.subscribeToEvents();
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

  protected subscribeToEvents(): void {
    if (typeof this.whenClick === 'function') {
      this.$$emitter.on<MouseEventMap, IntersectionEventHandler>('click', (a) => console.log(a));
    }
  }
}
