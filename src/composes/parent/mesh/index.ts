import { MeshComponent } from '@/components/meshes/mesh';
import { getCurrentInstance } from 'vue';

export function useParentMesh(
  options?: { invalidTypeMessage: string },
): { mesh: MeshComponent } {
  const instance = getCurrentInstance();
  const mesh = instance?.parent?.exposed as MeshComponent;

  if (!mesh?.isMesh) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not Mesh');
  }

  return {
    mesh,
  };
}
