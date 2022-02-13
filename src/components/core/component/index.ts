import { ComponentEvents } from '@/types/events';
import { TinyEmitter } from 'tiny-emitter';
import { Vue } from 'vue-class-component';

export abstract class Component<T, P = Record<string, unknown>>
  extends Vue {
  declare public $props: P

  protected abstract createTarget<A extends never>(...args: A): T | Promise<T>

  protected $$emitter: TinyEmitter<ComponentEvents> | null = null

  protected $$target: T | null = null

  public render(): never {
    return (this.$slots?.default?.() ?? []) as never;
  }

  public get target(): T | null {
    return this.$$target;
  }
}
