import path from 'path';
import { createTask } from '../task';
import markdownlint from 'markdownlint';
import { mdValidationRules } from '../md-validation-rules/index';

const configMD = {
  default: true,
  MD013: false,
  MD024: false,
};

export const checkChangelogTask = createTask('CHANGELOG.md check', async (opt) => {
  if (!opt.checkChangelog) {
    opt.skip();
    return opt;
  }

  const changelogPath = path.resolve(opt.root, 'CHANGELOG.md');

  const errorsMD = markdownlint.sync({
    config: { ...configMD },
    files: changelogPath,
    customRules: mdValidationRules,
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
