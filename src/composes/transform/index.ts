import { Transformable } from '@/types/transformatable';
import { Vec3 } from '@/types/vec3';
import { Euler, Object3D, Vector3 } from 'three';
import { PropType } from 'vue';

export const useTransformsProps = {
  rotation: {
    type: [Object, Number] as PropType<Partial<Vec3> | number>,
    default: null,
  },
  position: {
    type: [Object, Number] as PropType<Partial<Vec3> | number>,
    default: null,
  },
  scale: {
    type: [Object, Number] as PropType<Partial<Vec3> | number>,
    default: null,
  },
  lookAt: {
    type: [Object, Number] as PropType<Partial<Vec3> | number>,
    default: null,
  },
};

export function useTransforms<O extends Object3D>(object3d: O) {
  const isExist = (field: unknown) => (typeof field).match(/object|number/) && field !== null;

  return {
    applyPosition(position: Transformable['position']) {
      if (isExist(position)) {
        const vector = (() => {
          if (typeof position === 'number') {
            return new Vector3(position, position, position);
          }

          return new Vector3(position.x, position.y, position.z);
        })();

        object3d.position.set(vector.x, vector.y, vector.z);
      }
    },
    applyRotation(rotation: Transformable['rotation']) {
      if (isExist(rotation)) {
        const vector = (() => {
          if (typeof rotation === 'number') {
            return new Euler(rotation, rotation, rotation);
          }

          return new Euler(rotation.x, rotation.y, rotation.z);
        })();

        object3d.rotation.set(vector.x, vector.y, vector.z);
      }
    },
    applyScale(scale: Transformable['scale']) {
      if (isExist(scale)) {
        const vector = (() => {
          if (typeof scale === 'number') {
            return new Vector3(scale, scale, scale);
          }

          return new Vector3(scale.x, scale.y, scale.z);
        })();

        object3d.scale.set(vector.x, vector.y, vector.z);
      }
    },
    applyLookAt(lookAt: Transformable['lookAt']) {
      if (isExist(lookAt)) {
        const vector = (() => {
          if (typeof lookAt === 'number') {
            return new Vector3(lookAt, lookAt, lookAt);
          }

          return new Vector3(lookAt.x, lookAt.y, lookAt.z);
        })();

        object3d.lookAt(vector.x, vector.y, vector.z);
      }
    },
  };
}
