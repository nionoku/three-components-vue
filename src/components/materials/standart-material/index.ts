import {
  MeshStandardMaterial,
  MeshStandardMaterialParameters,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { BaseMaterial } from '../material';

interface Props {
  parameters?: Omit<MeshStandardMaterialParameters, 'color'>
  color?: MeshStandardMaterialParameters['color']
}

type PropsImpl = Required<Props>

@Options({})
export default class StandartMaterial
  extends BaseMaterial<MeshStandardMaterial, Props>
  implements PropsImpl {
  @Prop({ type: Object, default: () => undefined })
  public readonly parameters!: PropsImpl['parameters']

  @Prop({ type: [Object, Number, String], default: 'white' })
  public readonly color!: PropsImpl['color']

  @Watch('color')
  protected whenColorChanged(): void {
    this.applyTarget();
  }

  public created(): void {
    this.applyTarget();
  }

  protected applyTarget(): void {
    this.disposeMaterial();

    if (!this.$parent.isMesh && !this.$parent.isMaterialsGroup) {
      throw new Error('Material must be child of Mesh or MaterialsGroup');
    }

    this.$$target = this.createTarget();

    if (this.$parent.isMesh) {
      this.$parent.setMaterial(this.$$target);
    }

    if (this.$parent.isMaterialsGroup) {
      this.$parent.appendMaterial(this.$$target, this.groups);
    }
  }

  protected createTarget(): MeshStandardMaterial {
    const material = new MeshStandardMaterial({
      ...this.parameters,
      color: this.color,
    });
    return material;
  }
}
