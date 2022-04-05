import { Component, ref } from 'vue';
import {
  BasicMaterial,
  BoxGeometry,
  PerspectiveCamera,
  Renderer,
  Scene,
  Mesh,
  OrbitControls,
  Group,
  MaterialsGroup,
  STLGeometry,
  ExtrudeGeometry,
  StandartMaterial,
  AmbientLight,
  PlaneGeometry,
  DirectionalLight,
} from '@/components';
import {
  Mesh as ThreeMesh, MeshStandardMaterial,
} from 'three';

export default {
  title: 'Actions/Click',
  component: Renderer,
};

const Template = () => ({
  setup() {
    const background = ref(0xF0F0F0);
    const boxColor = ref(0x5172F1);
    const boxWidth = ref(1);
    const orbitControlsEnabled = ref(true);
    const boxRotation = ref(Math.PI);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="77.42" height="79.97" version="1.1" viewBox="0 0 77.42 79.97">
    <path d="m38.82 33.79c-0.064 0.964-3.47 4.289-4.661 4.289-11.02 0-12.81 6.667-12.81 6.667 0.488 5.614 4.4 10.24 9.129 12.68 0.216 0.112 0.435 0.213 0.654 0.312q0.569 0.252 1.138 0.466a17.24 17.24 0 0 0 5.043 0.973c19.32 0.906 23.06-23.1 9.119-30.07a13.38 13.38 0 0 1 9.345 2.269 19.56 19.56 0 0 0-16.98-9.917c-0.46 0-0.91 0.038-1.362 0.069a19.39 19.39 0 0 0-10.67 4.111c0.591 0.5 1.258 1.168 2.663 2.553 2.63 2.591 9.375 5.275 9.39 5.59z" />
    </svg>`;
    const svg1 = `
    <svg>
    <path d="m74.62 26.83c-1.684-4.052-5.1-8.427-7.775-9.81a40.27 40.27 0 0 1 3.925 11.76l7e-3 0.065c-4.382-10.92-11.81-15.33-17.88-24.92-0.307-0.485-0.614-0.971-0.913-1.484-0.171-0.293-0.308-0.557-0.427-0.8a7.053 7.053 0 0 1-0.578-1.535 0.1 0.1 0 0 0-0.088-0.1 0.138 0.138 0 0 0-0.073 0c-5e-3 0-0.013 9e-3 -0.019 0.011s-0.019 0.011-0.028 0.015l0.015-0.026c-9.735 5.7-13.04 16.25-13.34 21.53a19.39 19.39 0 0 0-10.67 4.111 11.59 11.59 0 0 0-1-0.758 17.97 17.97 0 0 1-0.109-9.473 28.7 28.7 0 0 0-9.329 7.21h-0.018c-1.536-1.947-1.428-8.367-1.34-9.708a6.928 6.928 0 0 0-1.294 0.687 28.22 28.22 0 0 0-3.788 3.245 33.84 33.84 0 0 0-3.623 4.347v6e-3 -7e-3a32.73 32.73 0 0 0-5.2 11.74l-0.052 0.256c-0.073 0.341-0.336 2.049-0.381 2.42 0 0.029-6e-3 0.056-9e-3 0.085a36.94 36.94 0 0 0-0.629 5.343v0.2a38.76 38.76 0 0 0 76.95 6.554c0.065-0.5 0.118-0.995 0.176-1.5a39.86 39.86 0 0 0-2.514-19.47zm-44.67 30.34c0.181 0.087 0.351 0.181 0.537 0.264l0.027 0.017q-0.282-0.135-0.564-0.281zm8.878-23.38m31.95-4.934v-0.037l7e-3 0.041z" />
    <path d="m74.62 26.83c-1.684-4.052-5.1-8.427-7.775-9.81a40.27 40.27 0 0 1 3.925 11.76v0.037l7e-3 0.041a35.1 35.1 0 0 1-1.206 26.16c-4.442 9.531-15.19 19.3-32.02 18.82-18.18-0.515-34.2-14.01-37.19-31.68-0.545-2.787 0-4.2 0.274-6.465a28.88 28.88 0 0 0-0.623 5.348v0.2a38.76 38.76 0 0 0 76.95 6.554c0.065-0.5 0.118-0.995 0.176-1.5a39.86 39.86 0 0 0-2.514-19.47z" />
    <path d="m55.78 31.38c0.084 0.059 0.162 0.118 0.241 0.177a21.1 21.1 0 0 0-3.6-4.695c-12.05-12.05-3.157-26.12-1.658-26.84l0.015-0.022c-9.735 5.7-13.04 16.25-13.34 21.53 0.452-0.031 0.9-0.069 1.362-0.069a19.56 19.56 0 0 1 16.98 9.917z" />
    <path d="m24.96 24.36c0.314 0.2 0.573 0.374 0.8 0.531a17.97 17.97 0 0 1-0.109-9.473 28.7 28.7 0 0 0-9.329 7.21c0.189-5e-3 5.811-0.106 8.638 1.732z" />
    <path d="m0.354 42.16c2.991 17.67 19.01 31.17 37.19 31.68 16.83 0.476 27.58-9.294 32.02-18.82a35.1 35.1 0 0 0 1.206-26.16v-0.037c0-0.029-6e-3 -0.046 0-0.037l7e-3 0.065c1.375 8.977-3.191 17.67-10.33 23.56l-0.022 0.05c-13.91 11.33-27.22 6.834-29.91 5q-0.282-0.135-0.564-0.281c-8.109-3.876-11.46-11.26-10.74-17.6a9.953 9.953 0 0 1-9.181-5.775 14.62 14.62 0 0 1 14.25-0.572 19.3 19.3 0 0 0 14.55 0.572c-0.015-0.315-6.76-3-9.39-5.59-1.405-1.385-2.072-2.052-2.663-2.553a11.59 11.59 0 0 0-1-0.758c-0.23-0.157-0.489-0.327-0.8-0.531-2.827-1.838-8.449-1.737-8.635-1.732h-0.018c-1.536-1.947-1.428-8.367-1.34-9.708a6.928 6.928 0 0 0-1.294 0.687 28.22 28.22 0 0 0-3.788 3.245 33.84 33.84 0 0 0-3.638 4.337v6e-3 -7e-3a32.73 32.73 0 0 0-5.2 11.74c-0.019 0.079-1.396 6.099-0.717 9.221z" />
    <path d="m56.6 32.04c-0.169-0.155-0.368-0.315-0.581-0.476-0.079-0.059-0.157-0.118-0.241-0.177a13.38 13.38 0 0 0-9.345-2.269c13.94 6.97 10.2 30.97-9.119 30.07a17.24 17.24 0 0 1-5.043-0.973q-0.569-0.213-1.138-0.466c-0.219-0.1-0.438-0.2-0.654-0.312l0.027 0.017c2.694 1.839 16 6.332 29.91-5l0.022-0.05c0.347-0.81 4.951-12.26-3.84-20.36z" />
    <path d="m52.42 26.86a21.1 21.1 0 0 1 3.6 4.7c0.213 0.161 0.412 0.321 0.581 0.476 8.787 8.1 4.183 19.55 3.84 20.36 7.138-5.881 11.7-14.58 10.33-23.56-4.384-10.93-11.82-15.34-17.88-24.93-0.307-0.485-0.614-0.971-0.913-1.484-0.171-0.293-0.308-0.557-0.427-0.8a7.053 7.053 0 0 1-0.578-1.535 0.1 0.1 0 0 0-0.088-0.1 0.138 0.138 0 0 0-0.073 0c-5e-3 0-0.013 9e-3 -0.019 0.011s-0.019 0.011-0.028 0.015c-1.499 0.711-10.39 14.79 1.66 26.83z" />
    </svg>
    `;
    const svg2 = `
    <svg>
    <path d="m74.62 26.83c-1.684-4.052-5.1-8.427-7.775-9.81a40.27 40.27 0 0 1 3.925 11.76v0.037l7e-3 0.041a35.1 35.1 0 0 1-1.206 26.16c-4.442 9.531-15.19 19.3-32.02 18.82-18.18-0.515-34.2-14.01-37.19-31.68-0.545-2.787 0-4.2 0.274-6.465a28.88 28.88 0 0 0-0.623 5.348v0.2a38.76 38.76 0 0 0 76.95 6.554c0.065-0.5 0.118-0.995 0.176-1.5a39.86 39.86 0 0 0-2.514-19.47z" />
    <path d="m38.82 33.79c-0.064 0.964-3.47 4.289-4.661 4.289-11.02 0-12.81 6.667-12.81 6.667 0.488 5.614 4.4 10.24 9.129 12.68 0.216 0.112 0.435 0.213 0.654 0.312q0.569 0.252 1.138 0.466a17.24 17.24 0 0 0 5.043 0.973c19.32 0.906 23.06-23.1 9.119-30.07a13.38 13.38 0 0 1 9.345 2.269 19.56 19.56 0 0 0-16.98-9.917c-0.46 0-0.91 0.038-1.362 0.069a19.39 19.39 0 0 0-10.67 4.111c0.591 0.5 1.258 1.168 2.663 2.553 2.63 2.591 9.375 5.275 9.39 5.59z" />
    <path d="m21.35 44.74s1.789-6.667 12.81-6.667c1.191 0 4.6-3.325 4.661-4.289a19.3 19.3 0 0 1-14.55-0.572 14.62 14.62 0 0 0-14.25 0.572 9.953 9.953 0 0 0 9.181 5.775c-0.718 6.337 2.632 13.72 10.74 17.6 0.181 0.087 0.351 0.181 0.537 0.264-4.733-2.445-8.641-7.069-9.129-12.68z" />
    <path d="m74.62 26.83c-1.684-4.052-5.1-8.427-7.775-9.81a40.27 40.27 0 0 1 3.925 11.76l7e-3 0.065c-4.382-10.92-11.81-15.33-17.88-24.92-0.307-0.485-0.614-0.971-0.913-1.484-0.171-0.293-0.308-0.557-0.427-0.8a7.053 7.053 0 0 1-0.578-1.535 0.1 0.1 0 0 0-0.088-0.1 0.138 0.138 0 0 0-0.073 0c-5e-3 0-0.013 9e-3 -0.019 0.011s-0.019 0.011-0.028 0.015l0.015-0.026c-9.735 5.7-13.04 16.25-13.34 21.53 0.452-0.031 0.9-0.069 1.362-0.069a19.56 19.56 0 0 1 16.98 9.917 13.38 13.38 0 0 0-9.345-2.269c13.94 6.97 10.2 30.97-9.119 30.07a17.24 17.24 0 0 1-5.043-0.973q-0.569-0.213-1.138-0.466c-0.219-0.1-0.438-0.2-0.654-0.312l0.027 0.017q-0.282-0.135-0.564-0.281c0.181 0.087 0.351 0.181 0.537 0.264-4.733-2.446-8.641-7.07-9.129-12.68 0 0 1.789-6.667 12.81-6.667 1.191 0 4.6-3.325 4.661-4.289-0.015-0.315-6.76-3-9.39-5.59-1.405-1.385-2.072-2.052-2.663-2.553a11.59 11.59 0 0 0-1-0.758 17.97 17.97 0 0 1-0.109-9.473 28.7 28.7 0 0 0-9.329 7.21h-0.018c-1.536-1.947-1.428-8.367-1.34-9.708a6.928 6.928 0 0 0-1.294 0.687 28.22 28.22 0 0 0-3.788 3.245 33.84 33.84 0 0 0-3.623 4.347v6e-3 -7e-3a32.73 32.73 0 0 0-5.2 11.74l-0.052 0.256c-0.073 0.341-0.4 2.073-0.447 2.445v0a45.09 45.09 0 0 0-0.572 5.403v0.2a38.76 38.76 0 0 0 76.95 6.554c0.065-0.5 0.118-0.995 0.176-1.5a39.86 39.86 0 0 0-2.514-19.47zm-3.845 1.991 7e-3 0.041z" />
    </svg>
    `;
    const target = ref();

    // setInterval(() => { boxWidth.value += 0.01; }, 50);
    // setInterval(() => { boxColor.value += 10; }, 50);
    setInterval(() => { boxRotation.value += 0.1; }, 50);

    return {
      boxWidth,
      boxColor,
      background,
      orbitControlsEnabled,
      svg,
      svg1,
      svg2,
      boxRotation,
      target,
    };
  },
  render() {
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <Renderer
          parameters={{ antialias: true }}
          // onBeforeRender={({ delta }) => { this.boxRotation += 1 * delta; } }
        >
          <PerspectiveCamera position={{ z: 15, y: 5 }} lookAt={0}>
            <OrbitControls />
          </PerspectiveCamera>
          <Scene helper parameters={{
            background: this.background,
            // fog: { color: this.background, near: 25, far: 50 },
          }}>
            {/* <GridHelper parameters={{ divisions: 100 }} /> */}
            <Mesh position={{ y: -1 }} rotation={{ x: Math.PI * 1.5 }}>
              <PlaneGeometry parameters={{ width: 5, height: 5 }} />
              <BasicMaterial parameters={{ color: 0xB0B0B0 }} />
            </Mesh>
            <Mesh
              onClick={({ intersects }) => console.log('Клик по кубу', intersects)}
              onClickGlobal={({ intersects }) => console.log('Клик мимо куба', intersects)}
            >
              <BoxGeometry parameters={{ width: this.boxWidth }} />
              <MaterialsGroup>
                <BasicMaterial parameters={{ color: this.boxColor }} />
                <BasicMaterial parameters={{ color: 'blue' }} />
                <BasicMaterial parameters={{ color: 'green' }} />
                <BasicMaterial parameters={{ color: 'red' }} />
                <BasicMaterial parameters={{ color: 'aqua' }} />
                <BasicMaterial parameters={{ color: 'teal' }} />
              </MaterialsGroup>
            </Mesh>
            <Mesh
              position={{ x: -2 }}
              scale={0.05}
              rotation={{ x: Math.PI * 1.5 }}
              helper="blue"
              onInit={(mesh) => { this.target = mesh; }}
            >
              <STLGeometry path='/robot.stl' onLoad={() => console.log('Робот загружен')} />
              <StandartMaterial parameters={{ color: this.boxColor }} />
            </Mesh>

            <AmbientLight parameters={{ intensity: 0.8 }} />

            <DirectionalLight
              parameters={{ color: 'aqua', intensity: 1 }}
              position={{ y: 6, x: -5 }}
              target={this.target}
              helper='#1ea7fd'
            />

            <Mesh
              position={{ x: 2 }}
              rotation={{ y: this.boxRotation }}
              onMousemove={({ intersects }) => {
                ((intersects[0].object as ThreeMesh).material as MeshStandardMaterial)
                  .setValues({ color: 'red' });
              }}
            >
              <BoxGeometry />
              <StandartMaterial parameters={{ color: 'orange' }} />
            </Mesh>
            <Mesh
              position={{ x: 3.5, z: 0.04, y: 1 }}
              scale={0.02}
              rotation={{ x: Math.PI }}
              onInit={() => console.log('Firefox проинициализирован')}
              onClick={() => console.log('Клик по лисе')}
            >
              <ExtrudeGeometry
                svg={this.svg}
                parameters={{ steps: 3, depth: 14, bevelThickness: 0.5 }}
              />
              <BasicMaterial parameters={{ color: '#6152c2' }} />
            </Mesh>
            <Mesh position={{ x: 3.5, z: 0, y: 1 }} scale={0.02} rotation={{ x: Math.PI }}>
              <ExtrudeGeometry
                svg={this.svg1}
                parameters={{ steps: 3, depth: 10, bevelThickness: 0.5 }}
              />
              <BasicMaterial parameters={{ color: 'orange' }} />
            </Mesh>
            <Mesh
              position={{ x: 3.5, z: 0.02, y: 1 }}
              scale={0.02}
              rotation={{ x: Math.PI }}
              helper='blue'
            >
              <ExtrudeGeometry
                svg={this.svg2}
                parameters={{ steps: 3, depth: 12, bevelThickness: 0.5 }}
              />
              <BasicMaterial parameters={{ color: '#fa3153' }} />
            </Mesh>
            <Group position={{ x: -4 }} helper='red'>
              <Mesh position={{ x: 0.5, y: 0.5, z: -0.25 }}>
                <BoxGeometry />
                <BasicMaterial parameters={{ color: 'blue' }} />
              </Mesh>
              <Mesh position={{ x: -0.5, y: -0.5, z: 0.25 }}>
                <BoxGeometry />
                <BasicMaterial parameters={{ color: 'gray' }} />
              </Mesh>
            </Group>
          </Scene>
        </Renderer>
      </div>
    );
  },
}) as Component;

export const Example = Template.bind({});
