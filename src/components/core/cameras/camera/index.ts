import { Camera } from 'three';

export interface CameraComponent extends Pick<Camera, 'isCamera'> {
  camera: Camera
}
