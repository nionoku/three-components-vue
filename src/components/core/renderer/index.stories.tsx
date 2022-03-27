import { Component, ref } from 'vue';
import {
  BasicMaterial, BoxGeometry, PerspectiveCamera, Renderer, Scene,
} from '@/components';
import { Mesh } from '@/components/meshes';

export default {
  title: 'Actions/Click',
  component: Renderer,
};

const Template = () => ({
  setup() {
    const background = ref(0xF0F0F0);
    const boxWidth = ref(1);

    setInterval(() => { boxWidth.value += 0.01; }, 50);

    return {
      boxWidth,
      background,
    };
  },
  render() {
    return (
      <canvas width={400} height={300}>
        <Renderer>
          <PerspectiveCamera />
          <Scene parameters={{ background: this.background }}>
            <Mesh>
              <BoxGeometry parameters={{ width: this.boxWidth }} />
              <BasicMaterial parameters={{ color: 0x000 }} />
            </Mesh>
          </Scene>
        </Renderer>
      </canvas>
    );
  },
}) as Component;

export const Example = Template.bind({});
