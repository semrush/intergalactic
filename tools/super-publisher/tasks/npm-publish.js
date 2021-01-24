const path = require('path');
const execa = require('execa');
const semver = require('semver');
const task = require('../task');

module.exports = task('NPM publishing', async (opt) => {
  opt.progress('processing...');

  const packagePath = path.resolve(opt.root, 'package.json');
  delete require.cache[packagePath];

  const { version } = require(packagePath);

  const tag = semver.prerelease(version) ? 'beta' : 'latest';

  try {
    await execa('npm', [
      'publish',
      opt.root,
      '--tag',
      tag,
      '--access',
      'public',
      '--registry',
      'https://registry.npmjs.org',
    ]);
  } catch (e) {
    throw new Error(e.message);
  }

  return opt;
});
