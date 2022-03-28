import { useParentCamera } from '@/composes';
import { RenderEmitter } from '@/utils/emitter';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    useParentCamera({ invalidTypeMessage: 'OrbitControls must be child of Camera' });

    let controls: OrbitControls;
    RenderEmitter.addEventListener('before-render', ({ renderer: { domElement: canvas }, camera }) => {
      if (!controls) {
        controls = new OrbitControls(camera, canvas);
      }

      controls.update();
    });
  },
  render() {
    return this.$slots?.default?.() || [];
  },
});
