import {
  StandartMaterial, Mesh, PerspectiveCamera, Renderer, Scene, AmbientLight, DirectionalLight,
} from '@/components';
import BoxGeometry from '@/components/geometries/box-geometry';
import { Vec3 } from '@/types/vector';
import { onBeforeUnmount, Ref, ref } from 'vue';

export default {
  title: 'Materials/StandartMaterial',
  component: StandartMaterial,
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
          <PerspectiveCamera position={{ x: 2, y: 2, z: 1 }} lookAt={{ x: 0, y: 0, z: 0 }} />
          <Scene background={'#F0F0F0'}>
            <DirectionalLight position={{ x: 2, y: 2, z: 2 }} intensity={0.9} />
            {/* @ts-expect-error figureRotation was returns in setup */}
            <Mesh rotation={this.figureRotation}>
              <BoxGeometry />
              <StandartMaterial color={'darkviolet'} />
            </Mesh>
          </Scene>
        </Renderer>
      </div>
    );
  },
});

export const Example = Template.bind({});
