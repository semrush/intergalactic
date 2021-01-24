const fs = require('fs');
const path = require('path');
const execa = require('execa');
const task = require('../task');

module.exports = task('Building', async (opt) => {
  opt.progress('processing...');

  const pkg = require(path.resolve(opt.root, 'package.json'));
  if (pkg?.scripts?.build) {
    await execa('rm', ['-rf', 'lib'], {
      cwd: opt.root,
    });
    await execa('npm', ['run', 'build'], {
      cwd: opt.root,
      env: {
        NODE_ENV: 'production',
      },
    });

    try {
      fs.accessSync(path.join(opt.root, 'lib'));
    } catch (err) {
      throw new Error('lib not found');
    }
  }

  return opt;
});
