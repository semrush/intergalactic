import path from 'path';
import execa from 'execa';
import semver from 'semver';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { createTask } from '../task';

const RELEASES = ['patch', 'minor', 'major'];
const PRE_RELEASES = ['prepatch', 'preminor', 'premajor'];

function generateChoices(version, name) {
  const release = semver.inc(version, name);
  return `${name}|${release || version}`;
}

export const selectNextVersionTask = createTask('Choose next version', async (opt) => {
  if (!opt.selectVersion) {
    opt.skip();
    return opt;
  }

  let release = opt.release;

  if (!release) {
    const packagePath = path.resolve(opt.root, 'package.json');
    const { version, name } = fs.readJSONSync(packagePath);

    const choicesPrerelease = semver.prerelease(version)
      ? [generateChoices(version, 'prerelease'), new inquirer.Separator()]
      : [];

    const choices = [
      generateChoices(version, 'current'),
      new inquirer.Separator(),
      ...choicesPrerelease,
      ...PRE_RELEASES.map((n) => generateChoices(version, n)),
      new inquirer.Separator(),
      ...RELEASES.map((n) => generateChoices(version, n)),
    ];

    const value = await inquirer.prompt([
      {
        type: 'list',
        name: 'version',
        message: `Select the version package(${name}):`,
        choices,
        pageSize: choices.length,
      },
    ]);

    [release] = value.version.split('|');
  }

  if (release !== 'current') {
    await execa('npm', ['version', release, '--no-git-tag-version'], {
      cwd: opt.root,
    });
  }

  return opt;
});
