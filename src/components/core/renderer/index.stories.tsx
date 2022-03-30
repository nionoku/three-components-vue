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
import StlGeometry from '@/components/geometries/stl-geometry';

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
          <PerspectiveCamera position={{ z: 15, y: 5 }} lookAt={0}>
            <OrbitControls />
          </PerspectiveCamera>
          <Scene parameters={{
            background: this.background,
            fog: { color: this.background, near: 25, far: 50 },
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
            <Mesh position={{ x: -2 }} scale={0.05} rotation={{ x: -Math.PI / 2 }}>
              <StlGeometry path='/robot.stl' onLoad={() => console.log('Робот загружен')} />
              <BasicMaterial parameters={{ color: this.boxColor }} />
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
