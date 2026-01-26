import canUseDOM from '@semcore/core/lib/utils/canUseDOM';

type Task = (...args: any[]) => void;

/**
 * Util class for scheduling some work
 */
export class Scheduler {
  private idleId: number | null = null;
  private animationFrameId: number | null = null;
  private timeout: ReturnType<typeof setTimeout> | null = null;

  public schedule(task: Task, tasksTimeout?: number | null) {
    if (canUseDOM() && 'requestIdleCallback' in window) {
      if (this.idleId !== null) {
        window.cancelIdleCallback(this.idleId);
      }

      this.idleId = window.requestIdleCallback(task);
    } else if (tasksTimeout !== null && tasksTimeout !== undefined) {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(task, tasksTimeout);
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
