import { PublisherOptions } from './bin/cli';
import { Reporter } from './reporter';
const reporter = new Reporter();

type TaskOptions = PublisherOptions & {
  progress: (message: string) => void;
  skip: () => void;
  log: (message: string) => void;
  warn: (message: string) => void;
};

export type TaskArgs = PublisherOptions & {
  rawArgs: string[];
};

export const createTask = (
  name: string,
  taskFn: (options: TaskOptions, args?: TaskArgs) => Promise<TaskOptions>,
) => {
  reporter.addTask(name);
  const fn = async (opt: TaskOptions, args: TaskArgs) => {
    try {
      reporter.emit('start', name);

      const result = await taskFn(
        {
          ...opt,
          progress: (message) => reporter.progress(message),
          skip: () => reporter.emit('skip', name),
          log: (message) => reporter.emit('message', name, message),
          warn: (message) => reporter.emit('warning', name, message),
        },
        args,
      );

      reporter.emit('done', name);

      return result;
    } catch (error) {
      reporter.emit('error', name, error);

      throw null;
    }
  };
  fn.taskName = name;
  return fn;
};
