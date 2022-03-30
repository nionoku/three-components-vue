import { Object3DComponent } from '@/types/object3d';
import { ComponentInternalInstance, getCurrentInstance } from 'vue';

export function useParentObject3D(
  instance: ComponentInternalInstance | null,
  options?: { invalidTypeMessage: string },
): { object3D: Object3DComponent } {
  const currentInstance = instance || getCurrentInstance();

  if (!currentInstance) {
    throw new Error('Instance is null');
  }

  const object3D = currentInstance?.parent?.exposed as Object3DComponent;

  if (!object3D?.isObject3D) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not Object3D');
  }

  return {
    object3D,
  };
}
