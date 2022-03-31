import { useInitEventEmits } from '@/composes/events/init';
import { PointerEventsEmit, usePointerEvents, usePointerEventsEmits } from '@/composes/events/pointer';
import { useParentObject3D } from '@/composes/parent/object3d';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { useTransforms, useTransformsProps } from '@/composes/transform';
import {
  BoxHelper, BufferGeometry, Color, LineBasicMaterial, Material, Mesh,
} from 'three';
import {
  defineComponent, onBeforeUnmount, watch,
} from 'vue';

export interface MeshComponent extends Pick<Mesh, 'isMesh'> {
  setGeometry(geometry: BufferGeometry): void
  setMaterial(material: Material | Array<Material>): void
}

export default defineComponent({
  extends: useRenderWithDefaultSlot,
  props: {
    ...useTransformsProps,
    helper: {
      type: [String, Number],
      default: undefined,
    },
  },
  emits: {
    ...usePointerEventsEmits,
    ...useInitEventEmits<Mesh>(),
  },
  setup(props, { emit, expose }) {
    const mesh = new Mesh();
    const helper = new BoxHelper(mesh);
    const updateHelper = () => setTimeout(() => helper.update(), 0);
    // emit init action
    emit('init', mesh);

    const { object3D } = useParentObject3D(null, { invalidTypeMessage: 'Mesh must be child of Object3D' });
    object3D.add(mesh);

    // supports transforms
    const {
      applyPosition, applyRotation, applyScale, applyLookAt,
    } = useTransforms(mesh);
    const positionWatcherCanceler = watch(() => props.position, (position) => {
      applyPosition(position);
      updateHelper();
    }, { deep: true, immediate: true });
    const rotationWatcherCanceler = watch(() => props.rotation, (rotation) => {
      applyRotation(rotation);
      updateHelper();
    }, { deep: true, immediate: true });
    const scaleWatcherCanceler = watch(() => props.scale, (scale) => {
      applyScale(scale);
      updateHelper();
    }, { deep: true, immediate: true });
    const lookAtWatcherCanceler = watch(() => props.lookAt, (lookAt) => {
      applyLookAt(lookAt);
      updateHelper();
    }, { deep: true, immediate: true });
    const helperWatcherCanceler = watch(() => props.helper, (value) => {
      if (value) {
        (helper.material as LineBasicMaterial).color.set(value);
        object3D.add(helper);
      } else {
        object3D.remove(helper);
      }
    }, { immediate: true });
    // supports pointer events
    const {
      subscribe: subscribeToPointerEvents,
      unsubscribe: unsubscribeFromPointerEvents,
    } = usePointerEvents(mesh, emit as PointerEventsEmit);
    subscribeToPointerEvents();

    onBeforeUnmount(() => {
      unsubscribeFromPointerEvents();

      positionWatcherCanceler();
      rotationWatcherCanceler();
      scaleWatcherCanceler();
      lookAtWatcherCanceler();

      helperWatcherCanceler();

      helper.removeFromParent();
      mesh.removeFromParent();
    });

    const exposed: MeshComponent = {
      isMesh: true,
      setGeometry: (geometry) => {
        mesh.geometry = geometry;
        updateHelper();
      },
      setMaterial: (material) => {
        mesh.material = material;
      },
    };
    // expose public instances
    expose(exposed);
  },
});
