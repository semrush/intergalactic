const task = require('../task');
const fse = require('fs-extra');
const path = require('path');

module.exports = task('RELEASE check', async (opt) => {
  if (!opt.checkRelease) {
    opt.skip();
    return opt;
  }
  if (opt.package !== '@semcore/ui') {
    opt.log('not a @semcore/ui release');
    opt.skip();
    return opt;
  }

  const releaseChangelogPath = path.resolve(__dirname, '../../../release/CHANGELOG.md');
  const releaseChangelog = fse.readFileSync(releaseChangelogPath, 'utf-8');

  if (releaseChangelog.includes('[VERSION]')) {
    throw new Error(`Placeholder [VERSION] detected in ${releaseChangelogPath}`);
  }

  const mailerEnvVars = [
    'MAILCHIMPKEY2',
    'MAILCHIMPSERVER',
    'MAILCHIMPTEMPLATE',
    'LISTID',
    'MAILCHIMPTEMPLATE',
    'MAILCHIMPKEY1',
    'MAILCHIMPSERVER',
  ];

  if (mailerEnvVars.some((varName) => !process.env[varName])) {
    throw new Error(
      `Mailer env variables are missing: ${mailerEnvVars
        .filter((varName) => !process.env[varName])
        .join(', ')}`,
    );
  }

  return opt;
});
