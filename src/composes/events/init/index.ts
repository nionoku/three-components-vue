import { EventDispatcher, WebGLRenderer } from 'three';

interface InitEmits<T extends EventDispatcher | WebGLRenderer> {
  init(target: T): boolean
}

export function useInitEventEmits<T extends EventDispatcher | WebGLRenderer>(): InitEmits<T> {
  return {
    init: (target: T) => true,
  };
}
