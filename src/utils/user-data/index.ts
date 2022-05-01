import { Object3D } from 'three';

export function assignUserData(target: Object3D, data: Record<string, any>) {
  Object.entries(data).forEach(([key, value]) => {
    target.userData[key] = value;
  });
}
