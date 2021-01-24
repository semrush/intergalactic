const DEV = process.env.NODE_ENV !== 'production';

class Logger {
  private logger: any;

  constructor(logger) {
    this.logger = logger || {
      warn: () => {},
    };
  }

  console(level, msg, component) {
    this.logger[level](component ? `[${component}]: ${msg}` : msg);
  }

  warn(condition, msg, component) {
    if (DEV) {
      if (condition) {
        this.console('warn', msg, component);
      }
    }
  }
}
export { Logger };
export default new Logger(console);
