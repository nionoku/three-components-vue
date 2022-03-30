import { MaterialsGroupComponent } from '@/components/groups/materials-group';
import { ComponentInternalInstance, getCurrentInstance } from 'vue';

export function useParentMaterialGroup(
  instance: ComponentInternalInstance | null,
  options?: { invalidTypeMessage: string },
): { materialGroup: MaterialsGroupComponent } {
  const currentInstance = instance || getCurrentInstance();

  if (!currentInstance) {
    throw new Error('Instance is null');
  }

  const materialGroup = currentInstance?.parent?.exposed as MaterialsGroupComponent;

  if (!materialGroup?.isMaterialsGroup) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not Material Group');
  }

  return {
    materialGroup,
  };
}
