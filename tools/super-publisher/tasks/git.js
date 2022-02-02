const path = require('path');
const git = require('simple-git/promise')();
const task = require('../task');

module.exports = task('GIT fixation', async (opt) => {
  opt.progress('processing...');

  const packagePath = path.resolve(opt.root, 'package.json');
  delete require.cache[packagePath];

  const { version, name } = require(packagePath);

  git.cwd(opt.root);

  await git.add(`*`);
  const status = await git.status();

  if (status.files.length) {
    const tag = `${name}_${version}`;

    await git.commit(`[${name}] upgrade to ${version}`, {
      '--no-verify': null,
    });

    await git.tag(['-f', tag]);

    // await git.push('origin', 'master', {
    //   '--no-verify': null,
    //   // '--tags': null,
    //   '--follow-tags': null,
    // });
  }

  return opt;
});
