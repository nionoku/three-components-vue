import { Component, ref } from 'vue';
import { PerspectiveCamera, Renderer, Scene } from '@/components';

export default {
  title: 'Actions/Click',
  component: Renderer,
};

const Template = () => ({
  setup() {
    const background = ref(0xF0F0F0);

    return {
      background,
    };
  },
  render() {
    return (
      <canvas width={400} height={300}>
        <Renderer>
          <PerspectiveCamera />
          <Scene
            parameters={{ background: this.background }}
          />
        </Renderer>
      </canvas>
    );
  },
}) as Component;

export const Example = Template.bind({});
