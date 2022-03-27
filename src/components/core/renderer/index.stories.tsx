import { Component, ref } from 'vue';
import {
  BasicMaterial, BoxGeometry, MapControls, PerspectiveCamera, Renderer, Scene,
} from '@/components';
import { Mesh } from '@/components/meshes';

export default {
  title: 'Actions/Click',
  component: Renderer,
};

const Template = () => ({
  setup() {
    const background = ref(0xF0F0F0);
    const boxColor = ref(0x000);
    const boxWidth = ref(1);

    setInterval(() => { boxWidth.value += 0.01; }, 50);
    setInterval(() => { boxColor.value += 1; }, 50);

    return {
      boxWidth,
      boxColor,
      background,
    };
  },
  render() {
    return (
      <div>
        <canvas width={400} height={300}>
          <Renderer>
            <PerspectiveCamera position={{ y: 2 }} rotation={{ x: Math.PI / 2 }}>
              <MapControls />
            </PerspectiveCamera>
            <Scene parameters={{ background: this.background }}>
              <Mesh rotation={{ z: Math.PI / 5 }}>
                <BoxGeometry parameters={{ width: this.boxWidth }} />
                <BasicMaterial parameters={{ color: this.boxColor }} />
              </Mesh>
            </Scene>
          </Renderer>
        </canvas>
      </div>
    );
  },
}) as Component;

export const Example = Template.bind({});
