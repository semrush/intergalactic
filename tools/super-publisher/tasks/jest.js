const execa = require('execa');
const task = require('../task');

module.exports = task('Testing', async (opt) => {
  if (!opt.test) {
    opt.skip();
    return opt;
  }

  const { root } = opt;
  opt.progress('processing...');
  await execa('npm', ['run', 'test', '--', '--no-cache'], { cwd: root ? root : process.cwd() });

  return opt;
});
