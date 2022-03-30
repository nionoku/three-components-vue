import { ComponentInternalInstance, getCurrentInstance } from 'vue';

export function useParentHtmlElement(
  instance: ComponentInternalInstance | null,
  options?: { invalidTypeMessage: string },
): { element: HTMLElement } {
  const currentInstance = instance || getCurrentInstance();

  if (!currentInstance) {
    throw new Error('Instance is null');
  }

  const element = (currentInstance?.proxy?.$el as HTMLElement).parentElement;

  if (!(element instanceof HTMLElement)) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not HTMLElement');
  }

  return {
    element,
  };
}
