import { useParentObject3D } from '@/composes/parent-object3d';
import { BufferGeometry, Material, Mesh } from 'three';
import { defineComponent, onBeforeUnmount } from 'vue';

export interface MeshComponent extends Pick<Mesh, 'isMesh'> {
  setGeometry(geometry: BufferGeometry): void
  setMaterial(material: Material): void
}

export default defineComponent({
  setup(props, { expose }) {
    const mesh = new Mesh();

    const { object3D: parent } = useParentObject3D({ invalidTypeMessage: 'Mesh must be child of Object3D' });
    parent.add(mesh);

    onBeforeUnmount(() => {
      mesh.removeFromParent();
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
});
