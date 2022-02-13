import { RendererComponent } from '@/components/core/renderer';
import { ObjectComponent } from '@/components/core/object';
import { Camera as ThreeCamera } from 'three';
import { ComponentPublicInstance } from 'vue';

export interface CameraComponent extends ComponentPublicInstance, Pick<ThreeCamera, 'isCamera'> {}

export default abstract class Camera<C extends ThreeCamera, P>
  extends ObjectComponent<C, P>
  implements CameraComponent {
  declare public $parent: RendererComponent

  public isCamera: CameraComponent['isCamera'] = true

  protected subscribeToEvents(): void {
    // Camera can't supports click on itself
    return undefined;
  }
}
