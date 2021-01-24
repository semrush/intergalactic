const path = require('path');
const glob = require('glob');
const { promisify } = require('util');
const git = require('simple-git/promise')();
const task = require('../task');

const asyncGlob = promisify(glob);

module.exports = task('Show diff', async (opt) => {
  // opt.progress('processing...');

  const { name } = require(path.resolve(opt.root, 'package.json'));

  const { latest } = await git.tags({ [`${name}_*`]: null });

  // new release
  if (!latest) return opt;

  const files = await asyncGlob(path.resolve(opt.root, 'src/**'));

  const allLogs = await Promise.all(
    files.map(async (file) => {
      const log = await git.log({
        from: latest,
        to: 'HEAD',
        file,
      });
      log.file = file;
      return log;
    }),
  );

  const logs = allLogs.reduce((logs, log) => {
    const uniqueLogs = log.all.filter((log2) => !logs.some((log1) => log1.hash === log2.hash));
    return logs.concat(uniqueLogs);
  }, []);

  console.log(logs);

  // logs.forEach(log => {
  //   opt.log('🙀')
  //   opt.log(log.message)
  // })

  return opt;
});
