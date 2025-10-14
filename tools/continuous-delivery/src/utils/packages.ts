import * as path from 'node:path';
import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

import {
  componentChangelogParser,
  serializeComponentChangelog,
  serializeReleaseChangelog,
  releaseChangelogParser,
} from '@semcore/changelog-handler';
import dayjs from 'dayjs';
import fs from 'fs-extra';
import { toMarkdown } from 'marked-ast-markdown';
import semver from 'semver';

import { formatMarkdown } from '../utils';
import type { ChangelogChange, CollectedChangelog, IncrementType } from './changelog';

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
  private packagesMap = new Map<string, { path: string; data: PackageJson }>();

  public get list(): PackageJson[] {
    return Array.from(this.packagesMap.values()).map((pack) => pack.data);
  }

  public async collectPackages() {
    const semcorePath = resolvePath(dirname, '..', '..', '..', '..', 'semcore');
    const toolsPath = resolvePath(dirname, '..', '..', '..', '..', 'tools');

    const packagePaths = [
      ...(await fs.readdir(semcorePath)).map((packageName) =>
        resolvePath(semcorePath, packageName),
      ),
      ...(await fs.readdir(toolsPath)).map((packageName) =>
        resolvePath(toolsPath, packageName),
      ),
    ];

    await Promise.all(
      packagePaths.map(async (packagePath) => {
        const packageFilePath = resolvePath(packagePath, 'package.json');

        if (
          !(await fs.pathExists(packageFilePath)) ||
          packagePath.endsWith('semcore/table')
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
    if (!packageJson) return;

    const newVersion = semver.inc(packageJson.data.version, incrementType);

    if (!newVersion) return;

    packageJson.data.version = newVersion;
    await fs.writeJSON(resolvePath(packageJson.path, 'package.json'), packageJson.data, { spaces: 2 });

    const changelogPath = resolvePath(packageJson.path, 'CHANGELOG.md');
    const packageChangelogString = await fs.readFile(changelogPath, 'utf8');
    const packageChangelog = componentChangelogParser(packageJson.data.name, packageChangelogString, changelogPath);

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
      formatMarkdown(toMarkdown(serializeComponentChangelog(packageChangelog))),
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
      if (!packageJson) continue;

      releasePackageJson.data.dependencies[packageName] = `^${packageJson.data.version}`;
    }
    await fs.writeJSON(resolvePath(releasePackageJson.path, 'package.json'), releasePackageJson.data, { spaces: 2 });

    const changelogPath = resolvePath(releasePackageJson.path, 'CHANGELOG.md');
    const packageChangelogString = await fs.readFile(changelogPath, 'utf8');
    const packageChangelog = releaseChangelogParser(
      packageChangelogString,
      releasePackageJson.data.name,
      packages.map((p) => p.data.name).concat(...removedComponents),
      changelogPath,
    );

    const changes: Array<ChangelogChange & { component: string; version: string; date: string; isAutomatic: boolean }> = [];

    for (const [componentName, changelogComponent] of Object.entries(collectedChangelog.components)) {
      changelogComponent.changelog.forEach((changelog) => {
        changes.push({
          ...changelog,
          component: componentName,
          date: dayjs().format('YYYY-MM-DD'),
          isAutomatic: false,
          version: '',
        });
      });
    }

    packageChangelog.unshift({
      component: releasePackageJson.data.name,
      version: collectedChangelog.version,
      date: dayjs().format('YYYY-MM-DD'),
      changes,
    });

    await fs.writeFile(
      changelogPath,
      formatMarkdown(toMarkdown(serializeReleaseChangelog(packageChangelog))),
      'utf8',
    );
  }
}
