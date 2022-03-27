import { useParentObject3D } from '@/composes/parent-object3d';
import { useTransforms, useTransformsProps } from '@/composes/transform';
import { BufferGeometry, Material, Mesh } from 'three';
import { defineComponent, onBeforeUnmount, watch } from 'vue';

export interface MeshComponent extends Pick<Mesh, 'isMesh'> {
  setGeometry(geometry: BufferGeometry): void
  setMaterial(material: Material): void
}

export default defineComponent({
  props: {
    ...useTransformsProps,
  },
  setup(props, { expose }) {
    const mesh = new Mesh();

    const { object3D: parent } = useParentObject3D({ invalidTypeMessage: 'Mesh must be child of Object3D' });
    parent.add(mesh);

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

    onBeforeUnmount(() => {
      mesh.removeFromParent();

      positionWatcherCanceler();
      rotationWatcherCanceler();
      scaleWatcherCanceler();
      lookAtWatcherCanceler();
    });

    const exposed: MeshComponent = {
      isMesh: true,
      setGeometry: (geometry) => {
        mesh.geometry = geometry;
      },
      setMaterial: (material) => {
        mesh.material = material;
      },
    };
    // expose public instances
    expose(exposed);
  },
  render() {
    return this.$slots?.default?.() || [];
  },
});
