import { WebGLRenderer } from 'three';

export enum PowerPreference {
  HIGH_PERFORMANCE = 'high-performance',
  LOW_POWER = 'low-power',
  DEFAULT = 'default'
}

export interface InjectRenderer {
  renderer: WebGLRenderer | null
}
