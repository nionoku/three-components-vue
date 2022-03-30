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
import ExtrudeGeometry from '@/components/geometries/extrude-geometry';

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
    const svg = '<svg width="512px" height="512px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M256 54.99c-27 0-46.418 14.287-57.633 32.23-10.03 16.047-14.203 34.66-15.017 50.962-30.608 15.135-64.515 30.394-91.815 45.994-14.32 8.183-26.805 16.414-36.203 25.26C45.934 218.28 39 228.24 39 239.99c0 5 2.44 9.075 5.19 12.065 2.754 2.99 6.054 5.312 9.812 7.48 7.515 4.336 16.99 7.95 27.412 11.076 15.483 4.646 32.823 8.1 47.9 9.577-14.996 25.84-34.953 49.574-52.447 72.315C56.65 378.785 39 403.99 39 431.99c0 4-.044 7.123.31 10.26.355 3.137 1.256 7.053 4.41 10.156 3.155 3.104 7.017 3.938 10.163 4.28 3.146.345 6.315.304 10.38.304h111.542c8.097 0 14.026.492 20.125-3.43 6.1-3.92 8.324-9.275 12.67-17.275l.088-.16.08-.166s9.723-19.77 21.324-39.388c5.8-9.808 12.097-19.576 17.574-26.498 2.74-3.46 5.304-6.204 7.15-7.754.564-.472.82-.56 1.184-.76.363.2.62.288 1.184.76 1.846 1.55 4.41 4.294 7.15 7.754 5.477 6.922 11.774 16.69 17.574 26.498 11.6 19.618 21.324 39.387 21.324 39.387l.08.165.088.16c4.346 8 6.55 13.323 12.61 17.254 6.058 3.93 11.974 3.45 19.957 3.45H448c4 0 7.12.043 10.244-.304 3.123-.347 6.998-1.21 10.12-4.332 3.12-3.122 3.984-6.997 4.33-10.12.348-3.122.306-6.244.306-10.244 0-28-17.65-53.205-37.867-79.488-17.493-22.74-37.45-46.474-52.447-72.315 15.077-1.478 32.417-4.93 47.9-9.576 10.422-3.125 19.897-6.74 27.412-11.075 3.758-2.168 7.058-4.49 9.81-7.48 2.753-2.99 5.192-7.065 5.192-12.065 0-11.75-6.934-21.71-16.332-30.554-9.398-8.846-21.883-17.077-36.203-25.26-27.3-15.6-61.207-30.86-91.815-45.994-.814-16.3-4.988-34.915-15.017-50.96C302.418 69.276 283 54.99 256 54.99z"/></svg>';

    // setInterval(() => { boxWidth.value += 0.01; }, 50);
    setInterval(() => { boxColor.value += 10; }, 50);

    return {
      boxWidth,
      boxColor,
      background,
      orbitControlsEnabled,
      svg,
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
            // fog: { color: this.background, near: 25, far: 50 },
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
            <Mesh position={{ x: 4 }} scale={0.005} rotation={{ x: Math.PI }}>
              <ExtrudeGeometry svg={this.svg} parameters={{ steps: 3, depth: 120 }} />
              <BasicMaterial parameters={{ color: 'red' }} />
            </Mesh>
          </Scene>
        </Renderer>
      </div>
    );
  },
}) as Component;

export const Example = Template.bind({});
