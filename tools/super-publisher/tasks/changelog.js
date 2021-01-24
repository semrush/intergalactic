const fs = require('fs-extra');
const path = require('path');
const task = require('../task');

module.exports = task('Write to CHANGELOG.md', async (opt) => {
  if (!opt.changelog) {
    opt.skip();
    return opt;
  }

  const packagePath = path.resolve(opt.root, 'package.json');
  delete require.cache[packagePath];

  const { version } = require(packagePath);

  const changelogPath = path.resolve(opt.root, 'CHANGELOG.md');

  let changelogParse = (await fs.readFile(changelogPath)).toString().split('\n');
  const now = new Date();
  const year = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(now);
  const month = new Intl.DateTimeFormat('ru', { month: 'numeric' }).format(now);
  const day = new Intl.DateTimeFormat('ru', { day: 'numeric' }).format(now);
  const index = changelogParse.findIndex((str) => /\[\d\.\d\.\d\]/.test(str));
  changelogParse.splice(
    index,
    0,
    `## [${version}] - ${year}-${month}-${day}\n\n${opt.changelog.replace(/\\n/g, '\n')}\n`,
  );
  changelogParse = changelogParse.join('\n');

  await fs.writeFile(changelogPath, changelogParse);

  return opt;
});
