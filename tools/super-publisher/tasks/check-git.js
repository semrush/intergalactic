const git = require('simple-git/promise')();
const task = require('../task');

module.exports = task('GIT check', async (opt) => {
  if (!opt.checkGit) {
    opt.skip();
    return opt;
  }

  opt.progress('processing...');

  const status = await git.status();
  const fetch = await git.fetch(['--dry-run']);

  if (fetch.remote) {
    throw new Error('THE REMOTE CONTAINS WORK THAT YOU DO NOT HAVE LOCALLY. CALL `GIT PULL`');
  }

  if (status.current !== 'master') {
    throw new Error('YOU CAN PUBLISH COMPONENTS ONLY FROM THE MASTER BRANCH');
  }

  if (status.files.length) {
    opt.warn('COMMITTED ALL FILES IN GIT');
  }
  return opt;
});
