import { copyLib } from './copyLibs';
import { updateReleaseChangelog } from './updateReleaseChangelog';
import path from 'path';
import fs from 'fs-extra';
import { publishTarball } from './publishTarball';
import Git from 'simple-git';
import { log } from '../utils';
import { updateExternalDeps } from './updateExternalDeps';

const git = Git();
const dirname = path.resolve(process.cwd(), 'node_modules', 'intergalactic');

export const CI_AUTHOR_NAME = 'semrush-ci-whale';

const publishPreRelease = async () => {
  const logResult = await git.log();

  if (logResult.latest?.author_name === 'CI_AUTHOR') {
    log('Skip prerelease form CI commit');

    process.exit();
  }

  const packageJsonFilePath = path.resolve(dirname, 'package.json');
  const packageJson = fs.readJSONSync(packageJsonFilePath);
  const deps = fs.readJSONSync(path.resolve(dirname, 'components.json'));
  const packages = Object.keys(deps);

  // 1) Copy all built code
  await copyLib(packages);

  // 2) Set deps from all components to root intergalactic package
  await updateExternalDeps(packageJson, packages);

  // 3) Update changelog
  const { version, changelogs } = await updateReleaseChangelog(packageJson, deps);
  const hash = await git.revparse(['HEAD']);
  const shortHash = hash.slice(0, 8);

  if (version === null) {
    log('No changes from previous version was found. Skip publish prerelease.');
    return;
  }

  // 4) Update version in package.json
  packageJson.version = `${version}-prerelease-${shortHash}`;
  fs.writeJsonSync(packageJsonFilePath, packageJson, { spaces: 2 });

  // 5) Publish package
  await publishTarball(packageJson.name, dirname, true);
};

export { publishPreRelease };
