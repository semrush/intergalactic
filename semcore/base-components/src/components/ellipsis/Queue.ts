import { Scheduler, type Task } from './Scheduler';

type Options = {
  queueTimeout?: number;
};

export class Queue {
  private queue = new Set<Task>();

  private readonly queueTimeout: number = 0;
  private processQueueTick: Scheduler | null = null;

  constructor(options?: Options) {
    if (options?.queueTimeout) {
      this.queueTimeout = options.queueTimeout;
    }

    this.processQueue = this.processQueue.bind(this);
  }

  public add(task: Task) {
    this.queue.add(task);

    if (this.queue.size === 1 && this.processQueueTick === null) {
      this.processQueueTick = new Scheduler();
      this.processQueueTick.schedule(this.processQueue, this.queueTimeout === 0 ? undefined : this.queueTimeout);
    }
  }

  public delete(task: Task) {
    this.queue.delete(task);
  }

  private processQueue(): void {
    const nextTask = this.queue.values().next().value;

    if (nextTask) {
      this.queue.delete(nextTask);
      nextTask();

      this.processQueueTick = new Scheduler();
      this.processQueueTick.schedule(this.processQueue, this.queueTimeout === 0 ? undefined : this.queueTimeout);
    } else {
      this.processQueueTick?.cancel();
      this.processQueueTick = null;
    }
  }
}
