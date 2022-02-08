import Emitter from 'tiny-emitter/instance';
import { Vue } from 'vue-class-component';

export abstract class Component<T, P = Record<string, unknown>> extends Vue {
  declare public $props: P

  protected $$target: T | null = null

  protected $$emitter: typeof Emitter | null = null

  protected abstract createTarget(...args: Array<unknown>): T

  public beforeCreate(): void {
    this.$$emitter = Emitter;
  }

  // FIXME (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }

  public get target(): T | null {
    return this.$$target;
  }
}
