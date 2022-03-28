import { useParentCamera } from '@/composes/parent/camera';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { RenderEmitter } from '@/utils/emitter';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  defineComponent, onBeforeUnmount, watch, watchEffect,
} from 'vue';

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    screenSpacePanning: {
      type: Boolean,
      default: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    useParentCamera({ invalidTypeMessage: 'OrbitControls must be child of Camera' });

    let controls: OrbitControls;
    RenderEmitter.addEventListener('before-render', ({ renderer: { domElement: canvas }, camera }) => {
      if (!controls) {
        controls = new OrbitControls(camera, canvas);
        controls.screenSpacePanning = props.screenSpacePanning;
      }

      controls.update();
    });

    const spacePannignWatcherCanceler = watch(
      () => props.screenSpacePanning,
      (value) => { controls.screenSpacePanning = value; },
    );

    const enabledWatcherCanceler = watch(
      () => props.enabled,
      (value) => { controls.enabled = value; },
    );

    onBeforeUnmount(() => {
      spacePannignWatcherCanceler();
      enabledWatcherCanceler();
    });
  },
});
