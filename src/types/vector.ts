import { Vec2 } from 'three';

export interface Vec3 extends Vec2 {
  z: number
}

export function toDefaultlyVec3(vec: Partial<Vec3>): Vec3 {
  return {
    x: vec.x ?? 0,
    y: vec.y ?? 0,
    z: vec.z ?? 0,
  };
}
