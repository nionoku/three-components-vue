import { CameraComponent } from '@/components/core/cameras/camera';
import { ComponentInternalInstance, getCurrentInstance } from 'vue';

export function useParentCamera(
  instance: ComponentInternalInstance | null,
  options?: { invalidTypeMessage: string },
): { camera: CameraComponent } {
  const currentInstance = instance || getCurrentInstance();

  if (!currentInstance) {
    throw new Error('Instance is null');
  }

  const camera = currentInstance?.parent?.exposed as CameraComponent;

  if (!camera?.isCamera) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not Camera');
  }

  return {
    camera,
  };
}
