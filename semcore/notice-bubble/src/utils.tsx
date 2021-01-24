class Timer {
  timerId: any = null;
  start: number = null;
  remaining: number = null;
  delay: number = null;
  callback = null;

  constructor(callback, delay) {
    this.callback = callback;
    this.delay = delay;
    this.remaining = delay;
    this.resume();
  }

  pause() {
    clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
  }

  resume() {
    this.start = Date.now();
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.callback, this.remaining);
  }

  reset() {
    this.remaining = this.delay;
    this.resume();
  }

  clear() {
    clearTimeout(this.timerId);
  }
}

export { Timer };
