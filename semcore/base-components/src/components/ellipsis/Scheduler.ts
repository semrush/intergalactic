import canUseDOM from '@semcore/core/lib/utils/canUseDOM';

type Task = (...args: any[]) => void;

/**
 * Util class for scheduling some work
 */
export class Scheduler {
  private idleId: number | null = null;
  private timeout: ReturnType<typeof setTimeout> | null = null;
  private readonly tasksTimeout: number = 16;

  constructor(tasksTimeout?: number) {
    if (tasksTimeout !== undefined) {
      this.tasksTimeout = tasksTimeout;
    }
  }

  public schedule(task: Task) {
    if (canUseDOM() && 'requestIdleCallback' in window) {
      if (this.idleId !== null) {
        window.cancelIdleCallback(this.idleId);
      }

      this.idleId = window.requestIdleCallback(task);
    } else {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(task, this.tasksTimeout);
    }
  }

  public cancel() {
    if (this.idleId !== null) {
      window.cancelIdleCallback(this.idleId);
    } else if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
  }
}
