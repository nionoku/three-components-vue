import { Camera, Renderer, Scene } from 'three';

export class Looper {
  protected timestep: number

  protected lastTimestamp = 0

  protected hasLoop = true

  constructor(
    protected fps: number,
    protected renderer: Renderer,
    protected scene: Scene,
    protected camera: Camera,
  ) {
    this.timestep = 1000 / this.fps;
  }

  public start(): void {
    this.renderer.render(this.scene, this.camera);
  }

  public cancel(): void {
    this.hasLoop = false;
  }

  protected loop(time: number): void {
    if (!this.hasLoop) return;

    requestAnimationFrame(this.loop);

    if (time - this.lastTimestamp < this.timestep) return;

    this.lastTimestamp = time;
    this.renderer.render(this.scene, this.camera);
  }
}