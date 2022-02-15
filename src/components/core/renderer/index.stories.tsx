import {
  BasicMaterial,
  BoxGeometry,
  MaterialsGroup,
  Mesh,
  OrbitControls,
  PerspectiveCamera,
  Renderer,
  Scene,
  StandartMaterial,
  STLBufferGeometry,
} from '@/components';
import { ref } from 'vue';

export default {
  title: 'Actions/Click',
  component: BoxGeometry,
};

const Template = (args: any) => ({
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const colors = ['red', 'blue', 'green', 'yellow', 'grey', 'cadetblue'];
    const index = ref(0);
    const index1 = ref(0);
    const index2 = ref(0);
    setInterval(() => {
      index.value = Math.floor(Math.random() * colors.length);
      index1.value = Math.floor(Math.random() * colors.length);
      index2.value = Math.floor(Math.random() * colors.length);
    }, 500);
    return {
      ...args, colors, index, index1, index2,
    };
  },
  // Then, the spread values can be accessed directly in the template
  render() {
    return (
      <div style={{ width: '500px', height: '300px', border: '1px dashed black' }}>
        <Renderer width={500} height={300}>
          <PerspectiveCamera position={4} lookAt={0} aspect={500 / 300}>
            <OrbitControls />
          </PerspectiveCamera>

          <Scene background={'#F0F0F0'}>
            <Mesh
              scale={0.05}
              rotate={{ x: Math.PI * 1.5, y: 0, z: 0 }}
              whenClick={(_uuids, _intersections, target) => alert(`Click by blue box, target: ${target?.object.uuid}`)}
              whenClickGlobal={() => alert('Click globally, listen by blue box')}
            >
              <STLBufferGeometry path='/robot.stl' />
              <BasicMaterial color={'cadetblue'} parameters={{ wireframe: true }} />
            </Mesh>

            <Mesh position={{ x: -2, y: 0, z: 0 }}>
              <BoxGeometry />
              <MaterialsGroup>
                <BasicMaterial
                  color={this.colors[this.index]}
                  parameters={{ opacity: 0.5, transparent: true }}
                />
                <BasicMaterial
                  color={this.colors[this.index1]}
                  groups={[4, 5]}
                />
                <StandartMaterial
                  color={this.colors[this.index2]}
                  groups={[2, 3]}
                  parameters={{ wireframe: true }}
                />
              </MaterialsGroup>
            </Mesh>
          </Scene>
        </Renderer>
      </div>
    );
  },
});

export const Example = Template.bind({});
