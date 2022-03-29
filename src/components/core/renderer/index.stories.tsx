import { Component, ref } from 'vue';
import {
  BasicMaterial,
  BoxGeometry,
  PerspectiveCamera,
  Renderer,
  Scene,
  Mesh,
  OrbitControls,
  GridHelper,
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
    const orbitControlsEnabled = ref(true);

    // setInterval(() => { boxWidth.value += 0.01; }, 50);
    setInterval(() => { boxColor.value += 10; }, 50);

    return {
      boxWidth,
      boxColor,
      background,
      orbitControlsEnabled,
    };
  },
  render() {
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <Renderer>
          <PerspectiveCamera position={{ x: -6 }} lookAt={0}>
            <OrbitControls />
          </PerspectiveCamera>
          <Scene parameters={{
            background: this.background,
            fog: { color: this.background, density: 0.1 },
          }}>
            {/* <GridHelper parameters={{ divisions: 100 }} /> */}
            <Mesh
              onClick={({ intersects }) => console.log('Клик по кубу', intersects)}
              onClickGlobal={({ intersects }) => console.log('Клик мимо куба', intersects)}
            >
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
            <Mesh position={{ x: 2 }}>
              <BoxGeometry />
              <BasicMaterial parameters={{ color: 'orange' }} />
            </Mesh>
          </Scene>
        </Renderer>
      </div>
    );
  },
}) as Component;

export const Example = Template.bind({});
