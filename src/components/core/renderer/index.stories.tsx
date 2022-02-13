import {
  BasicMaterial,
  BoxGeometry,
  Mesh,
  OrbitControls,
  PerspectiveCamera,
  Renderer,
  Scene,
  STLBufferGeometry,
} from '@/components';

export default {
  title: 'Actions/Click',
  component: BoxGeometry,
};

const Template = (args: any) => ({
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { ...args };
  },
  // Then, the spread values can be accessed directly in the template
  render() {
    return (
      <div style={{ width: '500px', height: '300px', border: '1px dashed black' }}>
        <Renderer width={500} height={300}>
          <PerspectiveCamera position={4} lookAt={0}>
          </PerspectiveCamera>

          <Scene background={'#F0F0F0'}>
            <Mesh position={{ x: -2, y: 0, z: 0 }}>
              <BoxGeometry />
              <BasicMaterial color={'darkviolet'} wireframe={false} />
            </Mesh>
          </Scene>
        </Renderer>
      </div>
    );
  },
});

export const Example = Template.bind({});
