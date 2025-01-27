import { copyLib } from './copyLibs';
import { updateReleaseChangelog } from './updateReleaseChangelog';
import path from 'node:path';
import fs from 'fs-extra';
import { publishTarball } from './publishTarball';
import Git from 'simple-git';
import { log } from '../utils';
import { updateExternalDeps } from './updateExternalDeps';
import { gitUtils } from '../utils/gitUtils';
import { updateComponentsVersions } from './updateComponentsVersions';

const dirname = path.resolve(process.cwd(), 'node_modules', 'intergalactic');

const updateIntergalacticChangelog = async () => {
  const packageJsonFilePath = path.resolve(dirname, 'package.json');
  const packageJson = fs.readJSONSync(packageJsonFilePath);
  const deps = fs.readJSONSync(path.resolve(dirname, 'components.json'));
  const packages = Object.keys(deps);

  // 3) Update changelog
  const { version } = await updateReleaseChangelog(packageJson, deps);

  updateComponentsVersions(packages, path.resolve(dirname, 'components.json'));

  // 4) Update version in package.json
  packageJson.version = version;
  fs.writeJsonSync(packageJsonFilePath, packageJson, { spaces: 2 });
};

const setIntergalacticPrereleaseVersion = async (prerelease: string) => {
  const packageJsonFilePath = path.resolve(dirname, 'package.json');
  const packageJson = fs.readJSONSync(packageJsonFilePath);

  packageJson.version = `${packageJson.version}-${prerelease}`;
  fs.writeJsonSync(packageJsonFilePath, packageJson, { spaces: 2 });
};

const generateIntergalacticCodeBeforePublish = async () => {
  const packageJsonFilePath = path.resolve(dirname, 'package.json');
  const packageJson = fs.readJSONSync(packageJsonFilePath);
  const deps = fs.readJSONSync(path.resolve(dirname, 'components.json'));
  const packages = Object.keys(deps);

  await copyLib(packages);
  await updateExternalDeps(packageJson, packages);
};

export {
  updateIntergalacticChangelog,
  setIntergalacticPrereleaseVersion,
  generateIntergalacticCodeBeforePublish,
};
