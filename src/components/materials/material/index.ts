import { MeshComponent } from '@/components/meshes/mesh';
import {
  Material as ThreeMaterial, MaterialParameters,
} from 'three';
import { Component } from '@/components/core/component';
import { Prop, Watch } from 'vue-property-decorator';
import { MaterialsGroupComponent } from '../../materials-group/group';

interface Props {
  groups?: Array<number>
}

export type MaterialComponent = Pick<ThreeMaterial, 'isMaterial'>

type PropsImpl = Required<Props>

export abstract class BaseMaterial<
  M extends ThreeMaterial,
  P = Record<string, unknown>,
  PM = MaterialParameters
>
  extends Component<M, P & Props>
  implements PropsImpl, MaterialComponent {
  declare public $parent: MeshComponent & MaterialsGroupComponent

  public readonly isMaterial: MaterialComponent['isMaterial'] = true

  protected abstract readonly parameters: PM

  protected abstract applyTarget(): void

  @Watch('parameters', { deep: true })
  protected whenParametersChanged(): void {
    this.applyTarget();
  }

  /** Used only with MaterialsGroup */
  @Prop({ type: [Array, Number], default: null })
  public readonly groups!: PropsImpl['groups']

  public beforeDestroy(): void {
    this.disposeMaterial();
  }

  protected disposeMaterial(): void {
    const targetUUID = this.$$target?.uuid;
    if (this.$parent.isMaterialsGroup && targetUUID) {
      this.$parent.removeMaterial(targetUUID);
    }

    this.$$target?.dispose();
  }
}
