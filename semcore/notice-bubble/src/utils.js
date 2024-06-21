class Timer {
  constructor(callback, delay) {
    this.callback = callback;
    this.delay = delay;
    this.remaining = delay;
    this.paused = false;
    this.resume();
  }

  pause() {
    clearTimeout(this.timerId);
    this.remaining -= Date.now() - this.start;
    this.paused = true;
  }

  resume() {
    this.start = Date.now();
    this.paused = false;
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
