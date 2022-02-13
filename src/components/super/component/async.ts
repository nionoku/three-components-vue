import { ComponentEvents } from '@/types/events';
import { TinyEmitter } from 'tiny-emitter';
import { Vue } from 'vue-class-component';

export abstract class AsyncComponent<T, P = Record<string, unknown>> extends Vue {
  declare public $props: P

  declare protected $$emitter: TinyEmitter<ComponentEvents> | null

  protected $$target: T | null = null

  protected abstract createTarget(...args: Array<unknown>): Promise<T>

  // FIXME (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }

  public get target(): T | null {
    return this.$$target;
  }
}
