import fs from 'fs-extra';
import { Package } from './collectPackages';
import { log } from './utils';
import { resolve as resolvePath } from 'path';
import { VersionPatch } from './makeVersionPatches';
import { reversedTopologicalSort } from './reversedTolopologicalSort';
import { execSync } from 'child_process';
import Git from 'simple-git';
const git = Git();

export const republishTarballs = async (packagesPaths: string[]) => {
  log('Republishing prereleased packages...');

  const packages = await Promise.all(
    packagesPaths.map(async (path) => {
      const packageFilePath = resolvePath(path, 'package.json');
      const packageFile = await fs.readJson(packageFilePath);

      return { path, package: packageFile };
    }),
  );

  const sortedPackages = reversedTopologicalSort(
    packages.map((data) => ({
      data,
      name: data.package.name,
      dependencies: Object.keys(data.package.dependencies),
    })),
  );

  const pnpmOptions = process.argv.includes('--dry-run')
    ? '--dry-run --no-git-checks'
    : '--no-git-checks';

  log(`pnpm options "${pnpmOptions}".`);

  for (const {
    path,
    package: { name, version, scripts },
  } of sortedPackages) {
    if (scripts['upload-static']) {
      log(`Building ${name}...`);
      execSync(`pnpm --filter ${name} run build`, {
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
      });
      log(`Build of ${name} is finished.`);
      log(`Uploading static files of ${name}...`);
      execSync(`pnpm --filter ${name} run upload-static`, {
        encoding: 'utf-8',
        stdio: ['inherit', 'inherit', 'inherit'],
      });
      log(`Uploading static of ${name} is finished.`);
    }
    log(`Publishing ${name}...`);
    execSync(`pnpm publish ${pnpmOptions}`, {
      cwd: path,
      encoding: 'utf-8',
      stdio: ['inherit', 'inherit', 'inherit'],
    });
    if (!process.argv.includes('--dry-run')) {
      await git.tag(['-f', `@${name}@${version}`]);
    }
    log(`Publishing of ${name} is finished.`);
  }

  log('Prereleased packages were republished.');
};
