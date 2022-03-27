import { getCurrentInstance } from 'vue';

export function useParentCanvas(
  options?: { invalidTypeMessage: string },
): { canvas: HTMLCanvasElement } {
  const instance = getCurrentInstance();

  const canvas = (instance?.proxy?.$el as HTMLElement).parentElement;

  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not Object3D');
  }

  return {
    canvas,
  };
}
