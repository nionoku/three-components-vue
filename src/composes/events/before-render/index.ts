import { BeforeRenderEventData } from '@/types/events/render';
import { RenderEmitter } from '@/utils/emitter';

interface BeforeRenderEmits {
  beforeRender(ctx: BeforeRenderEventData): boolean
}

export const useBeforeRenderEmits: BeforeRenderEmits = {
  beforeRender(ctx: BeforeRenderEventData) {
    return true;
  },
};

export function useBeforeRender(
  emit: (event: keyof BeforeRenderEmits, ctx: BeforeRenderEventData) => void,
) {
  const callback = (ctx: BeforeRenderEventData) => emit('beforeRender', ctx);

  return {
    subscribe() {
      return RenderEmitter.addEventListener('before-render', callback);
    },
    unsubscribe() {
      return RenderEmitter.removeEventListener('before-render', callback);
    },
  };
}
