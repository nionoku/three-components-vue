import { useInitEventEmits } from '@/composes/events/init';
import { PointerEventsEmit, usePointerEvents, usePointerEventsEmits } from '@/composes/events/pointer';
import { useParentObject3D } from '@/composes/parent/object3d';
import { useRenderWithDefaultSlot } from '@/composes/render-with-default-slot';
import { useTransforms, useTransformsProps } from '@/composes/transform';
import {
  BoxHelper, Group, LineBasicMaterial,
} from 'three';
import {
  defineComponent, onBeforeUnmount, watch,
} from 'vue';
import { Object3DComponent } from '@/types/object3d';

export type GroupComponent = Object3DComponent & Pick<Group, 'isGroup'>

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
    ...useInitEventEmits<Group>(),
  },
  setup(props, { emit, expose }) {
    const group = new Group();
    const helper = new BoxHelper(group);
    const updateHelper = () => setTimeout(() => helper.update(), 0);
    // emit init action
    emit('init', group);

    const { object3D } = useParentObject3D(null, { invalidTypeMessage: 'Group must be child of Object3D' });
    object3D.add(group);

    // supports transforms
    const {
      applyPosition, applyRotation, applyScale, applyLookAt,
    } = useTransforms(group);
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
    } = usePointerEvents(group, emit as PointerEventsEmit);
    subscribeToPointerEvents();

    onBeforeUnmount(() => {
      unsubscribeFromPointerEvents();

      positionWatcherCanceler();
      rotationWatcherCanceler();
      scaleWatcherCanceler();
      lookAtWatcherCanceler();

      helperWatcherCanceler();

      helper.removeFromParent();
      group.removeFromParent();
    });

    const exposed: GroupComponent = {
      isGroup: true,
      isObject3D: true,
      add(objects) {
        group.add(objects);
        updateHelper();

        return group;
      },
      remove(objects) {
        group.remove(objects);
        updateHelper();

        return group;
      },
    };
    // expose public instances
    expose(exposed);
  },
});
