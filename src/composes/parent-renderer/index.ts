import { RendererComponent } from '@/components/core/renderer';
import { getCurrentInstance } from 'vue';

export function useParentRenderer(
  options?: { invalidTypeMessage: string },
): { renderer: RendererComponent } {
  const instance = getCurrentInstance();
  const renderer = instance?.parent?.exposed as RendererComponent;

  if (!renderer.isRenderer) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not renderer');
  }

  return {
    renderer,
  };
}
