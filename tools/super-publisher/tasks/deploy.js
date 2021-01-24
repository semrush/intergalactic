const execa = require('execa');
const path = require('path');
const task = require('../task');

module.exports = task('Deploy static', async (opt) => {
  opt.progress('processing...');

  const pkg = require(path.resolve(opt.root, 'package.json'));

  if (pkg?.scripts?.deploy) {
    await execa('npm', ['run', 'deploy'], { cwd: opt.root });
  }

  return opt;
});
