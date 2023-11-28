import { copyLib } from './copyLibs';
import { updateReleaseChangelog } from './updateReleaseChangelog';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';
import { publishTarball } from './publishTarball';
import Git from 'simple-git';
import { commitPatch } from './commitPatch';
import { updateComponentsVersions } from './updateComponentsVersions';

const git = Git();
const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..', '..');

const publishPreRelease = async () => {
  if (!process.argv.includes('--dry-run')) {
    throw new Error('on test use dry-run');
  }

  const packageJsonFilePath = path.resolve(dirname, 'package.json');
  const packageJson = fs.readJSONSync(packageJsonFilePath);
  const deps = fs.readJSONSync(path.resolve(dirname, 'components.json'));
  const packages = Object.keys(deps);

  // 1) Copy all built code
  await copyLib(packages);

  // 2) Update changelog
  const { version, changelogs } = await updateReleaseChangelog(packageJson, deps);
  const hash = await git.revparse(['HEAD']);
  const shortHash = hash.slice(0, 8);

  // 3) Update version in package.json
  packageJson.version = `${version}-prerelease-${shortHash}`;
  fs.writeJsonSync(packageJsonFilePath, packageJson, { spaces: 2 });

  // 4) Publish package
  await publishTarball(packageJson.name);
};

export { publishPreRelease };
