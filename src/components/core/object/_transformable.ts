import { Vec3 } from '@/types/vector';

export interface Transformable {
  rotate: Partial<Vec3> | number
  position: Partial<Vec3> | number
  scale: Partial<Vec3> | number
  lookAt: Partial<Vec3> | number
}
