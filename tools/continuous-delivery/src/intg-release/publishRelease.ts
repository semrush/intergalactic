import { updateReleaseChangelog } from './updateReleaseChangelog';
import { updateComponentsVersions } from './updateComponentsVersions';
import { publishReleaseNotes, getUnlockedPrerelease } from '../../index';
import path from 'path';
import fs from 'fs-extra';
import { commitPatch } from './commitPatch';
import { publishTarball } from './publishTarball';
import { log } from '../utils';
import { updateVersionInComponents } from './updateVersionInComponents';
import axios from 'axios';
import { ResponseNpmRegistry } from '../fetchFromNpm';
import Git from 'simple-git';
import { downloadTarballs } from '../downloadTarballs';
import { unpackTarballs } from '../unpackTarballs';
import { closeTasks } from './closeTasks';
import {CI_AUTHOR} from "./publishPreRelease";

const git = Git();

const dirname = path.resolve(process.cwd(), 'node_modules', 'intergalactic');

const publishRelease = async () => {
  const packageJsonFilePath = path.resolve(dirname, 'package.json');
  const packageJson = fs.readJSONSync(packageJsonFilePath);
  const deps = fs.readJSONSync(path.resolve(dirname, 'components.json'));
  const packages = Object.keys(deps);

  // 1) Update changelog
  const { changelogs, version } = await updateReleaseChangelog(packageJson, deps);

  // 2) Update version in package.json
  packageJson.version = version;
  fs.writeJsonSync(packageJsonFilePath, packageJson, { spaces: 2 });

  // 3) Check that all tests are passed and release is unlocked
  const unlockedRelease = await getUnlockedPrerelease(packageJsonFilePath, log);
  if (!unlockedRelease) {
    log('No unlocked prerelease found.');
    if (!process.argv.includes('--dry-run')) {
      return;
    }
  }

  // 4) Get prerelease tarball
  const logs = await git.log({ maxCount: 10 });
  const filteredLogs = logs.all.filter((item) => item.author_name !== CI_AUTHOR);
  const hash = filteredLogs[0].hash;
  const shortHash = hash.slice(0, 8);

  const npmResponse = await axios.get<ResponseNpmRegistry>(
    `https://registry.npmjs.org/intergalactic/${version}-prerelease-${shortHash}`,
  );

  const tarballUrl = npmResponse.data.dist.tarball;

  const tarballPaths = await downloadTarballs([tarballUrl]);
  const [packagePath] = await unpackTarballs(tarballPaths);

  // 5) Update versions in components.json in both tarball nd current entry-point
  updateComponentsVersions(packages, path.resolve(packagePath, 'components.json'));
  updateComponentsVersions(packages, path.resolve(dirname, 'components.json'));

  // 5) Publish package
  fs.writeJsonSync(path.resolve(packagePath, 'package.json'), packageJson, { spaces: 2 });
  await publishTarball(packageJson.name, packagePath);

  // 5.1) Update versions in package.json in all checked components
  // TODO - For now, they updates in old release process. Uncomment after it will be removed.
  // updateVersionInComponents(changelogs);

  // 6) Close tasks in clickup
  if (!process.argv.includes('--dry-run') && version) {
    await closeTasks(version);
  }

  // 7) Commit changes in package.json and components.json
  if (!process.argv.includes('--dry-run') && version) {
    await commitPatch(version);
  }

  // 8) Release notes in slack channel
  // todo Brauer Ilia: uncomment after removing the previous release system
  // if (!process.argv.includes('--dry-run') && version) {
  //   await publishReleaseNotes(version, changelogs.slice(0, 1));
  // }
};

export { publishRelease };
