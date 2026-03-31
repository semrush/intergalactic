import * as path from 'node:path';
import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

import dayjs from 'dayjs';
import fs from 'fs-extra';
import { toMarkdown } from 'marked-ast-markdown';
import semver from 'semver';

import { formatMarkdown } from '../utils';
import type { ChangelogChange, CollectedChangelog, IncrementType } from './changelog';
import { Changelog } from './changelog';

export type PackageJson = {
  name: string;
  version: string;
  dependencies?: Record<string, string>;
  private?: boolean;
};

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..');

const removedComponents = [
  '@semcore/babel-plugin-shadow',
  '@semcore/project-create',
  '@semcore/chart',
  '@semcore/email',
  '@semcore/utils',
  '@semcore/table',
];

export class Package {
  public readonly packagesMap = new Map<string, { path: string; data: PackageJson }>();

  public get list(): PackageJson[] {
    return Array.from(this.packagesMap.values()).map((pack) => pack.data);
  }

  public get paths(): string[] {
    return Array.from(this.packagesMap.values()).map((pack) => pack.path);
  }

  public async collectPackages() {
    const semcorePath = resolvePath(dirname, '..', '..', '..', '..', 'semcore');

    const packagePaths = [
      ...(await fs.readdir(semcorePath)).map((packageName) =>
        resolvePath(semcorePath, packageName),
      ),
    ];

    await Promise.all(
      packagePaths.map(async (packagePath) => {
        const packageFilePath = resolvePath(packagePath, 'package.json');

        if (
          !(await fs.pathExists(packageFilePath)) ||
          packagePath.endsWith('semcore/table') ||
          packagePath.endsWith('semcore/theme')
        )
          return null;

        const packageFile: PackageJson = await fs.readJson(resolvePath(packagePath, 'package.json'));

        if (packageFile.private !== true) {
          this.packagesMap.set(packageFile.name, {
            path: packagePath,
            data: packageFile,
          });
        }
      }),
    );
  }

  public async updateVersions(collectedChangelog: CollectedChangelog) {
    const changelogComponents = collectedChangelog.components;

    for (const [componentName, changelogComponent] of Object.entries(changelogComponents)) {
      await this.updatePackageVersion(componentName, changelogComponent.incrementType, changelogComponent.changelog);
    }

    await this.updateReleaseVersion(collectedChangelog);
  }

  private async updatePackageVersion(componentName: string, incrementType: IncrementType, changelog: ChangelogChange[]) {
    const packageJson = this.packagesMap.get(componentName);
    if (!packageJson || changelog.length === 0) return;

    const newVersion = semver.inc(packageJson.data.version, incrementType);

    if (!newVersion) return;

    packageJson.data.version = newVersion;
    await fs.writeJSON(resolvePath(packageJson.path, 'package.json'), packageJson.data, { spaces: 2 });

    const changelogPath = resolvePath(packageJson.path, 'CHANGELOG.md');
    const packageChangelogString = await fs.readFile(changelogPath, 'utf8');
    const packageChangelog = Changelog.componentParser(packageJson.data.name, packageChangelogString, changelogPath);

    packageChangelog.unshift({
      component: packageJson.data.name,
      version: newVersion,
      date: dayjs().format('YYYY-MM-DD'),
      changes: changelog.map((item) => {
        return {
          ...item,
          component: packageJson.data.name,
          version: newVersion,
          isAutomatic: false,
        };
      }),
    });

    await fs.writeFile(
      changelogPath,
      formatMarkdown(toMarkdown(Changelog.serializeComponent(packageChangelog))),
      'utf8',
    );
  }

  private async updateReleaseVersion(collectedChangelog: CollectedChangelog) {
    const releasePackageJson = this.packagesMap.get('@semcore/ui');
    if (!releasePackageJson) return;

    releasePackageJson.data.version = collectedChangelog.version;
    releasePackageJson.data.dependencies = releasePackageJson.data.dependencies ?? {};

    const packages = Array.from(this.packagesMap.values());

    for (const packageValue of packages) {
      const packageName = packageValue.data.name;
      const packageJson = this.packagesMap.get(packageName);
      if (!packageJson || !releasePackageJson.data.dependencies[packageName]) continue;

      releasePackageJson.data.dependencies[packageName] = `^${packageJson.data.version}`;
    }
    await fs.writeJSON(resolvePath(releasePackageJson.path, 'package.json'), releasePackageJson.data, { spaces: 2 });

    const changelogPath = resolvePath(releasePackageJson.path, 'CHANGELOG.md');
    const packageChangelogString = await fs.readFile(changelogPath, 'utf8');
    const packageChangelog = Changelog.releaseParser(
      packageChangelogString,
      changelogPath,
    );

    for (const [componentName, changelogComponent] of Object.entries(collectedChangelog.components)) {
      packageChangelog.unshift({
        component: componentName,
        version: collectedChangelog.version,
        date: dayjs().format('YYYY-MM-DD'),
        changes: changelogComponent.changelog,
      });
    }

    await fs.writeFile(
      changelogPath,
      formatMarkdown(toMarkdown(Changelog.serializeRelease(packageChangelog))),
      'utf8',
    );
  }
}
