import { CameraComponent } from '@/components/core/cameras/camera';
import { getCurrentInstance } from 'vue';

export function useParentCamera(
  options?: { invalidTypeMessage: string },
): { camera: CameraComponent } {
  const instance = getCurrentInstance();
  const camera = instance?.parent?.exposed as CameraComponent;

  if (!camera?.isCamera) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not Camera');
  }

  return {
    camera,
  };
}
