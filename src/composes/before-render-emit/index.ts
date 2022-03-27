import { BeforeRenderEvent } from '@/types/events/render';
import { RenderEmitter } from '@/utils/emitter';

interface BeforeRenderEmits {
  beforeRender(ctx: BeforeRenderEvent): boolean
}

export function useBeforeRenderEmits(): BeforeRenderEmits {
  return {
    beforeRender(ctx: BeforeRenderEvent) {
      return true;
    },
  };
}

export function useBeforeRender(
  emit: (event: keyof BeforeRenderEmits, ctx: BeforeRenderEvent) => void,
) {
  const callback = (ctx: BeforeRenderEvent) => emit('beforeRender', ctx);

  return {
    subscribeToBeforeRender() {
      return RenderEmitter.addEventListener('before-render', callback);
    },
    unsubscribeFromBeforeRender() {
      return RenderEmitter.removeEventListener('before-render', callback);
    },
  };
}
