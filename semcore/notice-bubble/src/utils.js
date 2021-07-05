class Timer {
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
