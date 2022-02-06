import {
  StandartMaterial,
  Mesh,
  PerspectiveCamera,
  Renderer,
  Scene,
  DirectionalLight,
  BoxGeometry,
  MapControls,
} from '@/components';
import { Vec3 } from '@/types/vector';
import { Ref, ref } from 'vue';

export default {
  title: 'Controls/MapControls',
  component: MapControls,
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
        <Renderer width={500} height={300}>
          <PerspectiveCamera
            position={{ x: 2, y: 1.5, z: 1 }}
            lookAt={{ x: 0, y: 0, z: 0 }}
          />
          <MapControls />
          <Scene background={'#F0F0F0'}>
            <DirectionalLight position={{ x: 2, y: 3.5, z: 2 }} intensity={0.9} helper />
            {/* @ts-expect-error figureRotation was returns in setup */}
            <Mesh rotation={this.figureRotation}>
              <BoxGeometry />
              <StandartMaterial color={'darkcyan'} />
            </Mesh>
          </Scene>
        </Renderer>
      </div>
    );
  },
});

export const Example = Template.bind({});
