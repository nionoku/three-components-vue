import { RendererComponent } from '@/components/core/renderer';
import { ComponentInternalInstance, getCurrentInstance } from 'vue';

export function useParentRenderer(
  instance: ComponentInternalInstance | null,
  options?: { invalidTypeMessage: string },
): { renderer: RendererComponent } {
  const currentInstance = instance || getCurrentInstance();

  if (!currentInstance) {
    throw new Error('Instance is null');
  }

  const renderer = currentInstance?.parent?.exposed as RendererComponent;

  if (!renderer?.isRenderer) {
    throw new Error(options?.invalidTypeMessage || 'Parent is not renderer');
  }

  return {
    renderer,
  };
}
