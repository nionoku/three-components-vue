import {
  BasicMaterial, BoxGeometry, Mesh, OrbitControls, PerspectiveCamera, Renderer, Scene,
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
          <PerspectiveCamera position={{ x: 1.5, y: 4, z: 4 }} lookAt={{ x: 0, y: 0, z: 0 }} />
          <OrbitControls />
          <Scene background={'#F0F0F0'}>
            <Mesh
              rotation={{ x: 0, y: 10, z: 0 }}
              whenClick={(_uuids, _intersections, target) => alert(`Click by blue box, target: ${target?.object.uuid}`)}
              whenClickGlobal={() => alert('Click globally, listen by blue box')}
            >
              <BoxGeometry />
              <BasicMaterial color={'cadetblue'} wireframe={false} />
            </Mesh>

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
