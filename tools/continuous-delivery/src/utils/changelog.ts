import path from 'node:path';
import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

import { componentChangelogParser, serializeComponentChangelog } from '@semcore/changelog-handler';
import dayjs from 'dayjs';
import fs from 'fs-extra';
import type { Token } from 'marked-ast';
import { parse as parseMarkdown } from 'marked-ast';
import { toMarkdown } from 'marked-ast-markdown';
import semver from 'semver';
import Git from 'simple-git';

import { allowedScopes } from './allowedScopes';
import { formatMarkdown, log as logger } from '../utils';
import type { PackageJson } from '../utils/packages';
const git = Git();

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..');

export type ChangelogChange = {
  label: typeof changeTypes[number];
  description: string;
  descriptionFormatted: (string | Token)[];
};

export type IncrementType = 'major' | 'minor' | 'patch';

export type CollectedChangelog = {
  version: string;
  components: Record<string, {
    incrementType: IncrementType;
    changelog: ChangelogChange[];
  }>;
};

const changeTypes = ['Added', 'Changed', 'Fixed', 'BREAK'] as const;
const changeTypesSet = new Set(changeTypes);

export class Changelog {
  private readonly changelogs: CollectedChangelog = {
    version: '',
    components: {},
  };

  constructor(
    private readonly releaseTag: string,
  ) {}

  public get data(): CollectedChangelog {
    return this.changelogs;
  }

  public async collectFromHistory(): Promise<void> {
    const logs = await git.log({ from: this.releaseTag });
    const { specialScopes, toolsComponents, semcoreComponents } = await allowedScopes();
    const allAllowedScopes = new Set([...specialScopes, ...semcoreComponents, ...toolsComponents]);

    let traversingComponent: string | null = null;
    let traversingType: typeof changeTypes[number] | null = null;
    let incrementType: IncrementType = 'patch';

    logs.all.forEach((log) => {
      if (!log.body) return;

      const body = parseMarkdown(log.body);
      const changelogIndex = body.findIndex((item) => item.type === 'heading' && item.level === 2 && item.raw === 'Changelog');

      if (changelogIndex === -1) {
        logger(`No changelogs for ${log.message}`);
        return;
      }

      body.forEach((token: Token) => {
        if (token.type === 'heading' && token.level === 3 && token.raw && allAllowedScopes.has(token.raw.slice(9))) {
          traversingComponent = token.raw;
          this.changelogs.components[token.raw] = { incrementType: 'patch', changelog: [] };
        }
        if (token.type === 'heading' && token.level === 4 && token.raw && this.isType(token.raw) && traversingComponent !== null) {
          traversingType = token.raw;

          if (token.raw === 'Added') {
            incrementType = 'minor';
            this.changelogs.components[traversingComponent].incrementType = incrementType;
          } else if (token.raw === 'BREAK') {
            incrementType = 'major';
            this.changelogs.components[traversingComponent].incrementType = incrementType;
          }
        }
        if (token.type === 'list' && traversingComponent !== null && traversingType !== null) {
          token.body.forEach((item) => {
            if (traversingComponent !== null && traversingType !== null) {
              const descriptionFormatted = (Array.isArray(item) ? item[0] : item).text;
              const description = toMarkdown(descriptionFormatted);

              this.changelogs.components[traversingComponent].changelog.push({
                label: traversingType,
                description,
                descriptionFormatted,
              });
            }
          });
        }
        if (token.type === 'heading' && token.level === 2) {
          traversingComponent = null;
          traversingType = null;
        }
      });

      this.changelogs.version = semver.inc(this.releaseTag, incrementType)!;
    });
  }

  // public async updateRelease() {
  //   const releasePackagePath = resolvePath(dirname, '..', '..', '..', '..', 'semcore', 'ui');
  //   const releaseChangelogPath = resolvePath(releasePackagePath, 'CHANGELOG.md');
  //   const releasePackageJsonPath = resolvePath(releasePackagePath, 'package.json');
  //
  //   const packageFile: PackageJson = await fs.readJson(releasePackageJsonPath);
  //   const packageChangelogString = await fs.readFile(releaseChangelogPath, 'utf8');
  //   const packageChangelog = componentChangelogParser(packageFile.name, packageChangelogString, releaseChangelogPath);
  //
  //   const changes: Array<ChangelogChange & { component: string; version: string; date: string; isAutomatic: boolean }> = [];
  //
  //   for (const [componentName, changelogComponent] of Object.entries(this.changelogs.components)) {
  //     changelogComponent.changelog.forEach((changelog) => {
  //       changes.push({
  //         ...changelog,
  //         component: componentName,
  //         date: dayjs().format('YYYY-MM-DD'),
  //         isAutomatic: false,
  //         version: this.changelogs.version,
  //       });
  //     });
  //   }
  //
  //   packageChangelog.unshift({
  //     component: packageFile.name,
  //     version: this.changelogs.version,
  //     date: dayjs().format('YYYY-MM-DD'),
  //     changes,
  //   });
  //
  //   await fs.writeFile(
  //     releaseChangelogPath,
  //     formatMarkdown(toMarkdown(serializeComponentChangelog(packageChangelog))),
  //     'utf8',
  //   );
  // }

  private isType(type: string): type is typeof changeTypes[number] {
    if (changeTypesSet.has(type as any)) {
      return true;
    }

    return false;
  }
}
