type DefaultEmit = (eventName: string, ...args: any[]) => void;
type DefaultSubscribe = (eventName: string, fn: any) => () => void;

export default class EventEmitter<Emit = DefaultEmit, Subscribe = DefaultSubscribe> {
  private events: any = {};
  constructor() {
    this.emit = ((eventName: string, ...args: any[]) => {
      const event = this.events[eventName];
      if (event) {
        event.forEach((fn: any) => {
          fn.call(null, ...args);
        });
      }
    }) as any;
    this.subscribe = ((eventName: string, fn: any) => {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }

      this.events[eventName].push(fn);
      return () => {
        this.events[eventName] = this.events[eventName].filter((eventFn: any) => fn !== eventFn);
      };
    }) as any;
  }

  emit: Emit;

  subscribe: Subscribe;
}
