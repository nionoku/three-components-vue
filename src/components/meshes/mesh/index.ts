import { PointerEventsEmit, usePointerEvents, usePointerEventsEmits } from '@/composes/events/pointer';
import { useParentObject3D } from '@/composes/parent/object3d';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { useTransforms, useTransformsProps } from '@/composes/transform';
import {
  BoxHelper, BufferGeometry, Color, Material, Mesh,
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
      type: Boolean,
      default: undefined,
    },
  },
  emits: {
    ...usePointerEventsEmits,
  },
  setup(props, { emit, expose }) {
    const mesh = new Mesh();
    const helper = new BoxHelper(mesh);

    const { object3D } = useParentObject3D(null, { invalidTypeMessage: 'Mesh must be child of Object3D' });
    object3D.add(mesh);

    if (props.helper) {
      object3D.add(helper);
    }

    // supports transforms
    const {
      applyPosition, applyRotation, applyScale, applyLookAt,
    } = useTransforms(mesh);
    const positionWatcherCanceler = watch(() => props.position, applyPosition, {
      deep: true,
      immediate: true,
    });
    const rotationWatcherCanceler = watch(() => props.rotation, applyRotation, {
      deep: true,
      immediate: true,
    });
    const scaleWatcherCanceler = watch(() => props.scale, applyScale, {
      deep: true,
      immediate: true,
    });
    const lookAtWatcherCanceler = watch(() => props.lookAt, applyLookAt, {
      deep: true,
      immediate: true,
    });
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

      helper?.removeFromParent();
      mesh.removeFromParent();
    });

    const exposed: MeshComponent = {
      isMesh: true,
      setGeometry: (geometry) => {
        mesh.geometry = geometry;
        helper?.update(mesh);
      },
      setMaterial: (material) => {
        mesh.material = material;
      },
    };
    // expose public instances
    expose(exposed);
  },
});
