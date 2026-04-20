type Events = Record<string, (...args: any[]) => void>;
type Cleanup = () => void;

export default class EventEmitter<E extends Events, K extends keyof E = keyof E, H extends E[K] = E[K]> {
  private events = new Map<K, Set<H>>();

  public on(eventName: K, fn: H): Cleanup {
    const handlers = this.events.get(eventName) ?? new Set<H>();

    handlers.add(fn);

    this.events.set(eventName, handlers);

    return () => {
      this.off(eventName, fn);
    };
  }

  public off(eventName: K, fn: H): void {
    this.events.get(eventName)?.delete(fn);
  }

  public emit(eventName: K, ...args: Parameters<H>) {
    const handlers = this.events.get(eventName);

    if (handlers) {
      for (const handler of handlers) {
        handler.call(null, ...args);
      }
    }
  }

  /**
   * @deprecated. Fallback to the `on` method for backward compatibility.
   */
  public subscribe(eventName: K, fn: H): Cleanup {
    return this.on(eventName, fn);
  }
}
