import {
  BasicMaterial, BoxGeometry, Mesh, OrbitControls, PerspectiveCamera, Renderer, Scene,
} from '@/components';
import { Vec3 } from '@/types/vector';
import { Ref, ref } from 'vue';

export default {
  title: 'Geometries/BoxGeometry',
  component: BoxGeometry,
};

const Template = (args: any) => ({
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    const figureRotation: Ref<Vec3> = ref({ x: 0, y: 0, z: 0 });

    return { ...args, figureRotation };
  },
  // Then, the spread values can be accessed directly in the template
  render() {
    return (
      <div style={{ width: '500px', height: '300px', border: '1px dashed black' }}>
        <Renderer
          width={500} height={300}
          whenBeforeRender={() => {
            /* @ts-expect-error figureRotation was returns in setup */
            this.figureRotation.y += 0.01;
          }}
        >
          <PerspectiveCamera position={{ x: 2, y: 1.5, z: 1 }} lookAt={{ x: 0, y: 0, z: 0 }}>
            <OrbitControls />
          </PerspectiveCamera>

          <Scene background={'#F0F0F0'}>
            {/* @ts-expect-error figureRotation was returns in setup */}
            <Mesh rotation={this.figureRotation}>
              <BoxGeometry />
              <BasicMaterial color={'cadetblue'} wireframe={false} />
            </Mesh>
          </Scene>
        </Renderer>
      </div>
    );
  },
});

export const Example = Template.bind({});
