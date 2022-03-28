import { defineComponent } from 'vue';

export const useRenderWithDefaultSlot = defineComponent({
  render() {
    return this.$slots?.default?.() || [];
  },
});
