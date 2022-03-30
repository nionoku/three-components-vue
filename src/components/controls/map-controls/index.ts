import { useInitEventEmits } from '@/composes/events/init';
import { useParentCamera } from '@/composes/parent/camera';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { RenderEmitter } from '@/utils/emitter';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { defineComponent, onBeforeUnmount, watch } from 'vue';

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    screenSpacePanning: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    ...useInitEventEmits<MapControls>(),
  },
  setup(props, { emit }) {
    useParentCamera(null, { invalidTypeMessage: 'MapControls must be child of Camera' });

    let controls: MapControls;
    RenderEmitter.addEventListener('before-render', ({ renderer: { domElement: canvas }, camera }) => {
      if (!controls) {
        controls = new MapControls(camera, canvas);
        controls.screenSpacePanning = props.screenSpacePanning;
        emit('init', controls);
      }

      controls.update();
    });

    const spacePannignWatcherCanceler = watch(
      () => props.screenSpacePanning,
      (value) => { controls.screenSpacePanning = value; },
    );

    onBeforeUnmount(() => {
      spacePannignWatcherCanceler();
    });
  },
});
