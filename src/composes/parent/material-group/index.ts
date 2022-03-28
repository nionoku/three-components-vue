import { MaterialsGroupComponent } from '@/components/groups/materials-group';
import { getCurrentInstance } from 'vue';

export function useParentMaterialGroup(
  options?: { invalidTypeMessage: string },
): { materialGroup: MaterialsGroupComponent } {
  const instance = getCurrentInstance();
  const materialGroup = instance?.parent?.exposed as MaterialsGroupComponent;

  if (!materialGroup?.isMaterialsGroup) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not Material Group');
  }

  return {
    materialGroup,
  };
}
