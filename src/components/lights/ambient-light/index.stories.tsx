import {
  StandartMaterial, Mesh, PerspectiveCamera, Renderer, Scene, AmbientLight, BoxGeometry,
} from '@/components';
import { Vec3 } from '@/types/vector';
import { onBeforeUnmount, Ref, ref } from 'vue';

export default {
  title: 'Lights/AmbientLight',
  component: AmbientLight,
};

const Template = (args: any) => ({
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    const figureRotation: Ref<Vec3> = ref({ x: 0, y: 10, z: 0 });
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
          <PerspectiveCamera position={{ x: 2, y: 1.5, z: 1 }} lookAt={{ x: 0, y: 0, z: 0 }} />
          <Scene background={'#F0F0F0'}>
            <AmbientLight position={{ x: 10, y: 10, z: 10 }} intensity={0.4} />
            {/* @ts-expect-error figureRotation was returns in setup */}
            <Mesh rotation={this.figureRotation}>
              <BoxGeometry />
              <StandartMaterial color={'orange'} />
            </Mesh>
          </Scene>
        </Renderer>
      </div>
    );
  },
});

export const Example = Template.bind({});
