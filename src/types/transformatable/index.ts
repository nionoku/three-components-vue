import { Vec3 } from '@/types/vec3';

export interface Transformable {
  rotation: Partial<Vec3> | number,
  position: Partial<Vec3> | number,
  lookAt: Partial<Vec3> | number,
  scale: Partial<Vec3> | number
}
