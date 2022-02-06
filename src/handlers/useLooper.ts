import { Handler } from '@/types/handler';

class Looper implements Handler {
  protected timestep: number

  protected lastTimestamp = 0

  protected hasLoop = true

  constructor(
    protected fps: number,
    protected whenRenderFrame: FrameRequestCallback,
  ) {
    this.timestep = 1000 / this.fps;
  }

  public start(): void {
    this.loop(0);
  }

  public cancel(): void {
    this.hasLoop = false;
  }

  protected loop(time: number): void {
    if (!this.hasLoop) return;

    requestAnimationFrame((time) => this.loop(time));

    if (time - this.lastTimestamp < this.timestep) return;

    this.lastTimestamp = time;
    this.whenRenderFrame?.(time);
  }
}

export function useLooper(fps: number, whenRenderFrame: FrameRequestCallback): Handler {
  return new Looper(fps, whenRenderFrame);
}
