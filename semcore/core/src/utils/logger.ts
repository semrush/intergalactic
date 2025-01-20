const DEV = process.env.NODE_ENV !== 'production';

class Logger {
  private logger: any;

  constructor(logger?: typeof console) {
    this.logger = logger || {
      warn: () => {},
    };
  }

  console(level: string, msg: string, component: any) {
    this.logger[level](component ? `[${component}]: ${msg}` : msg);
  }

  warn(condition: any, msg: string, component: any) {
    if (DEV) {
      if (condition) {
        this.console('warn', msg, component);
      }
    }
  }
}
export { Logger };
export default new Logger(console);
