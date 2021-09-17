const path = require('path');
const task = require('../task');
const markdownlint = require('markdownlint');
const customRules = require('../md-rules');

const configMD = {
  default: true,
  MD013: false,
  MD024: false,
  MD028: false,
};

module.exports = task('CHANGELOG.md check', async (opt) => {
  if (!opt.checkChangelog) {
    opt.skip();
    return opt;
  }

  const packagePath = path.resolve(opt.root, 'package.json');
  delete require.cache[packagePath];

  const changelogPath = path.resolve(opt.root, 'CHANGELOG.md');

  const errorsMD = markdownlint.sync({
    config: { ...configMD },
    files: changelogPath,
    customRules,
  });

  if (errorsMD[changelogPath].length) {
    throw new Error(
      errorsMD[changelogPath].reduce(
        (errors, error) =>
          (errors += `${error.ruleDescription}: ${error.errorDetail} at line ${error.lineNumber}\n`),
        '',
      ),
    );
  }

  return opt;
});
