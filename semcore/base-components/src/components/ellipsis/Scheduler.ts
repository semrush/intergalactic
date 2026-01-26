import canUseDOM from '@semcore/core/lib/utils/canUseDOM';

type Task = (...args: any[]) => void;

/**
 * Util class for scheduling some work
 */
export class Scheduler {
  private allTasks: number = 0;
  private cancelledTasks: number = 0;
  private idleId: number | null = null;
  private timeout: ReturnType<typeof setTimeout> | null = null;
  private readonly tasksTimeout: number = 200;
  private readonly countNotToOptimise: number = 0;

  constructor(tasksTimeout?: number, countNotToOptimise?: number) {
    if (tasksTimeout !== undefined) {
      this.tasksTimeout = tasksTimeout;
    }
    if (countNotToOptimise !== undefined) {
      this.countNotToOptimise = countNotToOptimise;
    }
  }

  public schedule(task: Task) {
    this.allTasks++;
    if (canUseDOM() && 'requestIdleCallback' in window) {
      if (this.idleId !== null) {
        this.cancelledTasks++;
        window.cancelIdleCallback(this.idleId);
      }

      this.idleId = window.requestIdleCallback(task);
    } else {
      if (this.timeout !== null) {
        this.cancelledTasks++;
        clearTimeout(this.timeout);
      }

      const timeout = (this.allTasks - this.cancelledTasks) <= this.countNotToOptimise ? 0 : this.tasksTimeout;
      this.timeout = setTimeout(task, timeout);
    }
  }

  public cancel() {
    this.cancelledTasks++;
    if (this.idleId !== null) {
      window.cancelIdleCallback(this.idleId);
    } else if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
  }
}
