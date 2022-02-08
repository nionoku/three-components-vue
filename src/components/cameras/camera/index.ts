import { RendererComponent } from '@/components/core/renderer';
import { ObjectComponent } from '@/components/super/object';
import { Camera as ThreeCamera } from 'three';
import { ComponentPublicInstance } from 'vue';

export interface CameraComponent extends
  ComponentPublicInstance,
  Pick<ThreeCamera, 'isCamera'>
{}

export default abstract class Camera<C extends ThreeCamera, P>
  extends ObjectComponent<C, P>
  implements CameraComponent {
  declare public $parent: RendererComponent

  public isCamera: CameraComponent['isCamera'] = true

  public created(): void {
    if (!this.$parent.isRenderer) {
      throw new Error('Camera must be child of renderer');
    }

    this.$$target = this.prepareTarget();
    this.$parent.setCamera(this.$$target);
  }

  protected subscribeToEvents(): void {
    // Camera can't supports click on itself
    return undefined;
  }
}
