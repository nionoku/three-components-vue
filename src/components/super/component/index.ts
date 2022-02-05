import { Vue } from 'vue-class-component';

export abstract class Component<P, T> extends Vue {
  declare public $props: P

  protected $$target: T | null = null

  protected abstract createTarget(...args: Array<unknown>): T

  // FIXME (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }
}
