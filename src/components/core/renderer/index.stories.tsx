import { Component, ref } from 'vue';
import { Renderer, Scene } from '@/components';

export default {
  title: 'Actions/Click',
  component: Renderer,
};

const Template = () => ({
  setup() {
    const background = ref(0x000000);

    return {
      background,
    };
  },
  render() {
    return (
      <canvas width={300} height={300}>
        <Renderer>
          <Scene />
        </Renderer>
      </canvas>
    );
  },
}) as Component;

export const Example = Template.bind({});
