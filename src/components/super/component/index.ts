import { Vue } from 'vue-class-component';

export abstract class Component extends Vue {
  // FIXME (2022.02.04): Fix any
  public render(): any {
    return this.$slots?.default?.() ?? [];
  }
}
