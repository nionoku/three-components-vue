import { Object3DComponent } from '@/types/object3d';
import { getCurrentInstance } from 'vue';

export function useParentObject3D(
  options?: { invalidTypeMessage: string },
): { object3D: Object3DComponent } {
  const instance = getCurrentInstance();
  const object3D = instance?.parent?.exposed as Object3DComponent;

  if (!object3D.isObject3D) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not Object3D');
  }

  return {
    object3D,
  };
}
