import { BeforeRenderEvent } from '@/types/events/render';
import { RenderEmitter } from '@/utils/emitter';

interface BeforeRenderEmits {
  beforeRender(ctx: BeforeRenderEvent): boolean
}

export const useBeforeRenderEmits: BeforeRenderEmits = {
  beforeRender(ctx: BeforeRenderEvent) {
    return true;
  },
};

export function useBeforeRender(
  emit: (event: keyof BeforeRenderEmits, ctx: BeforeRenderEvent) => void,
) {
  const callback = (ctx: BeforeRenderEvent) => emit('beforeRender', ctx);

  return {
    subscribe() {
      return RenderEmitter.addEventListener('before-render', callback);
    },
    unsubscribe() {
      return RenderEmitter.removeEventListener('before-render', callback);
    },
  };
}
