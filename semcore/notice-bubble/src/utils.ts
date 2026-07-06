class Timer {
  private readonly delay: number;
  private readonly callback: Function;

  private remaining: number;
  private timerId: number | null = null;
  private start: number = 0;

  public paused: boolean;

  constructor(callback: Function, delay: number) {
    this.callback = callback;
    this.delay = delay;

    this.remaining = delay;
    this.paused = false;
    this.resume();
  }

  pause() {
    if (this.paused) return;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.remaining -= Date.now() - this.start;
    this.paused = true;
  }

  resume() {
    this.start = Date.now();
    this.paused = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = window.setTimeout(this.callback, this.remaining);
  }

  reset() {
    this.remaining = this.delay;
    this.resume();
  }

  clear() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}

export { Timer };
