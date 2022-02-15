import {
  MeshBasicMaterial, MeshBasicMaterialParameters,
} from 'three';
import { Options } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { BaseMaterial } from '../material';

interface Props {
  parameters?: Omit<MeshBasicMaterialParameters, 'color'>
  color?: MeshBasicMaterialParameters['color']
}

type PropsImpl = Required<Props>

@Options({})
export default class BasicMaterial
  extends BaseMaterial<MeshBasicMaterial, Props>
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

  protected createTarget(): MeshBasicMaterial {
    const geometry = new MeshBasicMaterial({
      ...this.parameters,
      color: this.color,
    });
    return geometry;
  }
}
