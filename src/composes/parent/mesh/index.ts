import { MeshComponent } from '@/components/meshes/mesh';
import { ComponentInternalInstance, getCurrentInstance } from 'vue';

export function useParentMesh(
  instance: ComponentInternalInstance | null,
  options?: { invalidTypeMessage: string },
): { mesh: MeshComponent } {
  const currentInstance = instance || getCurrentInstance();

  if (!currentInstance) {
    throw new Error('Instance is null');
  }

  const mesh = currentInstance?.parent?.exposed as MeshComponent;

  if (!mesh?.isMesh) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not Mesh');
  }

  return {
    mesh,
  };
}
