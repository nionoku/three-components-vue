import { Component, ref } from 'vue';
import {
  BasicMaterial,
  BoxGeometry,
  PerspectiveCamera,
  Renderer,
  Scene,
  Mesh,
  OrbitControls,
} from '@/components';
import { MaterialsGroup } from '@/components/groups';

export default {
  title: 'Actions/Click',
  component: Renderer,
};

const Template = () => ({
  setup() {
    const background = ref(0xF0F0F0);
    const boxColor = ref(0x000);
    const boxWidth = ref(1);

    // setInterval(() => { boxWidth.value += 0.01; }, 50);
    setInterval(() => { boxColor.value += 10; }, 50);

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
            <PerspectiveCamera position={0.1}>
              <OrbitControls />
            </PerspectiveCamera>
            <Scene parameters={{ background: this.background }}>
              <Mesh rotation={{ z: Math.PI / 5 }}>
                <BoxGeometry parameters={{ width: this.boxWidth }} />
                <MaterialsGroup>
                  <BasicMaterial parameters={{ color: this.boxColor }} />
                  <BasicMaterial parameters={{ color: 'blue' }} />
                  <BasicMaterial parameters={{ color: 'green' }} />
                  <BasicMaterial parameters={{ color: 'white' }} />
                  <BasicMaterial parameters={{ color: 'aqua' }} />
                  <BasicMaterial parameters={{ color: 'teal' }} />
                </MaterialsGroup>
              </Mesh>
            </Scene>
          </Renderer>
        </canvas>
      </div>
    );
  },
}) as Component;

export const Example = Template.bind({});
