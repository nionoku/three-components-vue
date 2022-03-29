import { getCurrentInstance } from 'vue';

export function useParentHtmlElement(
  options?: { invalidTypeMessage: string },
): { element: HTMLElement } {
  const instance = getCurrentInstance();

  const element = (instance?.proxy?.$el as HTMLElement).parentElement;

  if (!(element instanceof HTMLElement)) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not HTMLElement');
  }

  return {
    element,
  };
}
