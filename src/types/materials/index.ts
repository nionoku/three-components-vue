import { Material } from 'three';

export interface MaterialGroupItem {
  material: Material
  /** if groups equals 'default' - apply material for all groups */
  groups?: Array<number>
}
