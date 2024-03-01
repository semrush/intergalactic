import { copyLib } from './copyLibs';
import { updateReleaseChangelog } from './updateReleaseChangelog';
import path from 'path';
import fs from 'fs-extra';
import { publishTarball } from './publishTarball';
import Git from 'simple-git';
import { log } from '../utils';
import { updateExternalDeps } from './updateExternalDeps';
import { GitUtils } from '../utils/gitUtils';

const dirname = path.resolve(process.cwd(), 'node_modules', 'intergalactic');

const publishPreRelease = async () => {
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
  const currentVTag = await GitUtils.getCurrentTag();
  const currentTag = currentVTag?.slice(1);
  const versionFromTag = currentTag?.split('-')[0];

  if (version === null) {
    log('No changes from previous version was found. Skip publish prerelease.');
    return;
  }
  if (currentTag === undefined) {
    log('Not a tag. Skip publish prerelease.');
    return;
  }
  if (currentTag !== versionFromTag) {
    log(`Errors in calculated version. Calculated version is ${version}.`);
    return;
  }

  // 4) Update version in package.json
  packageJson.version = currentTag;
  fs.writeJsonSync(packageJsonFilePath, packageJson, { spaces: 2 });

  // 5) Publish package
  await publishTarball(packageJson.name, dirname, true);
};

export { publishPreRelease };
