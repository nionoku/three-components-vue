import { defineComponent, getCurrentInstance } from 'vue';
import Emitter from 'tiny-emitter/instance';
import { RendererComponent } from '@/components/core/renderer';

export default defineComponent({
  setup() {
    const instance = getCurrentInstance();
    const renderer = instance?.parent?.exposed as RendererComponent;
  },
  render() {
    return this.$slots?.default?.() || [];
  },
});
