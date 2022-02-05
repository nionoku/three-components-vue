import {
  BasicMaterial, Mesh, PerspectiveCamera, Renderer, Scene, TorusGeometry,
} from '@/components';
import { Vec3 } from '@/types/vector';
import { onBeforeUnmount, Ref, ref } from 'vue';

export default {
  title: 'Geometries/TorusGeometry',
  component: TorusGeometry,
};

const Template = (args: any) => ({
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    const figureRotation: Ref<Vec3> = ref({ x: 0, y: 10, z: 0 });

    const intervalId = setInterval(() => { figureRotation.value.y += 0.1; }, 100);
    onBeforeUnmount(() => clearInterval(intervalId));

    return { ...args, figureRotation };
  },
  // Then, the spread values can be accessed directly in the template
  render() {
    return (
      <div style={{ width: '500px', height: '300px', border: '1px dashed black' }}>
        <Renderer width={500} height={300}>
          <PerspectiveCamera position={{ x: 4, y: 0, z: 1 }} lookAt={{ x: 0, y: 0, z: 0 }} />
          <Scene background={'#F0F0F0'}>
            {/* @ts-expect-error figureRotation was returns in setup */}
            <Mesh rotation={this.figureRotation}>
              <TorusGeometry radialSegments={20} tubularSegments={20} />
              <BasicMaterial color={'cadetblue'} wireframe />
            </Mesh>
          </Scene>
        </Renderer>
      </div>
    );
  },
});

export const Example = Template.bind({});
