import canUseDOM from '@semcore/core/lib/utils/canUseDOM';

export type Task = (...args: any[]) => void;
/**
 * Util class for scheduling some work
 */
export class Scheduler {
  private idleId: number | null = null;
  private animationFrameId: number | null = null;
  private timeout: ReturnType<typeof setTimeout> | null = null;

  public schedule(task: Task, timeoutOrType?: number | 'idle') {
    if (typeof timeoutOrType === 'number') {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(task, timeoutOrType);
    } else if (timeoutOrType === 'idle' && canUseDOM() && 'requestIdleCallback' in window) {
      if (this.idleId !== null) {
        window.cancelIdleCallback(this.idleId);
      }

      this.idleId = window.requestIdleCallback(task);
    } else {
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
      }

      this.animationFrameId = requestAnimationFrame(task);
    }
  }

  public cancel() {
    if (this.idleId !== null) {
      window.cancelIdleCallback(this.idleId);
    } else if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    } else if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
  }
}
