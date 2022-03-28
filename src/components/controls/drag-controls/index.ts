import { useParentCamera } from '@/composes/parent/camera';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { RenderEmitter } from '@/utils/emitter';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { defineComponent } from 'vue';

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  setup() {
    useParentCamera({ invalidTypeMessage: 'DragControls must be child of Camera' });

    let controls: DragControls;
    RenderEmitter.addEventListener('before-render', ({ renderer: { domElement: canvas }, camera, scene }) => {
      if (!controls) {
        controls = new DragControls(scene.children, camera, canvas);
      }
    });
  },
});
