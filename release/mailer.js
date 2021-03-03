const path = require('path');
const task = require('@semcore/super-publisher/task');
const { getChangelogByDate } = require('changelogs-by-date/getChangeLogByDate');

module.exports = task('Send mail', async (opt) => {
  if (!opt.root.includes('release')) {
    opt.skip();
    return opt;
  }

  const packagePath = path.resolve(opt.root, 'package.json');
  delete require.cache[packagePath];

  const { version } = require(packagePath);

  const changelogPath = path.resolve(opt.root, 'CHANGELOG.md');

  const now = new Date();
  const year = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(now);
  const month = new Intl.DateTimeFormat('ru', { month: '2-digit' }).format(now);
  const day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(now);

  const componentsChangelogs = await getChangelogByDate('release', version, changelogPath);
  const changelogMeta = componentsChangelogs.find(({ date }) => date === `${year}-${month}-${day}`);

  // TODO send mailer
  console.log(changelogMeta);

  return opt;
});
