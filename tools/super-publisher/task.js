const Reporter = require('./reporter');
const reporter = new Reporter();

module.exports = (name, taskfn) => {
  reporter.addTask(name);
  const fn = async (opt, args) => {
    try {
      reporter.emit('start', name);

      const result = await taskfn(
        {
          ...opt,
          progress: (message) => reporter.progress(message),
          skip: () => reporter.emit('skip', name),
          log: (message) => reporter.emit('message', name, message),
          warn: (message) => reporter.emit('warning', name, message)
        },
        args
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
