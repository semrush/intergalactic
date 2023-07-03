export default class EventEmitter {
  private events: any = {};

  emit(...args: any[]) {
    const eventName: string = args[0];
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn: any) => {
        fn.call(null, ...args.slice(1));
      });
    }
  }

  subscribe(eventName: string, fn: any) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter((eventFn: any) => fn !== eventFn);
    };
  }
}
