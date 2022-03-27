import { useParentCamera } from '@/composes/parent-camera';
import { RenderEmitter } from '@/utils/emitter';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    useParentCamera({ invalidTypeMessage: 'MapControls must be child of Camera' });

    let controls: MapControls;
    RenderEmitter.addEventListener('before-render', ({ renderer: { domElement: canvas }, camera }) => {
      if (!controls) {
        controls = new MapControls(camera, canvas);
      }

      controls.update();
    });
  },
  render() {
    return this.$slots?.default?.() || [];
  },
});
