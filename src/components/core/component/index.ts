import { ComponentEvents } from '@/types/events';
import { EventDispatcher } from 'three';
import { TinyEmitter } from 'tiny-emitter';
import { ComponentPublicInstance } from 'vue';
import { Vue } from 'vue-class-component';

export abstract class Component<T extends EventDispatcher, P = Record<string, unknown>>
  extends Vue
  implements ComponentPublicInstance {
  declare public $props: P

  protected abstract $$emitter: TinyEmitter<ComponentEvents> | null

  protected abstract $$target: T | null

  protected abstract createTarget<A extends Array<unknown>>(...args: A): T | Promise<T>

  public render(): never {
    return (this.$slots?.default?.() ?? []) as never;
  }

  public get target(): T | null {
    return this.$$target;
  }
}
