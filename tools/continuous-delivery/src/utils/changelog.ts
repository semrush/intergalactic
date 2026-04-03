import path from 'node:path';
import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

import dayjs from 'dayjs';
import fs from 'fs-extra';
import type { Token } from 'marked-ast';
import { parse as parseMarkdown } from 'marked-ast';
import type { ListItem } from 'marked-ast-markdown';
import { toMarkdown } from 'marked-ast-markdown';
import semver from 'semver';
import Git from 'simple-git';

import { allowedScopes } from './allowedScopes';
import { isValidSemver, log as logger } from '../utils';
import type { PackageJson } from './packages';

const git = Git();

const filename = fileURLToPath(import.meta.url);
const dirname = path.resolve(filename, '..');

export type ChangelogChange = {
  label: ChangelogChangeLabel | null;
  description: string;
  descriptionFormatted: (string | Token)[];
};

export type ReleaseVersion = `${number}.${number}.${number}`;

export type IncrementType = 'major' | 'minor' | 'patch';

export type CollectedChangelog = {
  version: string;
  components: Record<string, {
    incrementType: IncrementType;
    changelog: ChangelogChange[];
  }>;
};

export type ChangelogItem = {
  component: string;
  date: string | 'unreleased';
  version: string;
  changes: ChangelogChange[];
};

const changeTypes = ['Added', 'Changed', 'Fixed', 'BREAK'] as const;
const changeTypesSet = new Set(changeTypes);

export type ChangelogChangeLabel = typeof changeTypes[number];

export class Changelog {
  private readonly changelogs: CollectedChangelog = {
    version: '',
    components: {},
  };

  constructor(
    private readonly prefix: string,
    private readonly releaseTag: ReleaseVersion,
    private readonly collectedPackages: PackageJson[],
  ) {
  }

  public get data(): CollectedChangelog {
    return this.changelogs;
  }

  public async collectFromHistory(): Promise<void> {
    const logs = await git.log({ from: this.tag });
    const { specialScopes, toolsComponents, semcoreBaseComponents, semcoreComponents } = await allowedScopes();
    const collectedSet = new Set(this.collectedPackages?.map((pack) => pack.name.slice(9))); // just name, without @semcore
    const allowed = [...specialScopes, ...semcoreComponents, ...semcoreBaseComponents, ...toolsComponents].filter((element) => {
      if (!this.collectedPackages) {
        return true;
      }

      return collectedSet.has(element);
    }).concat(...semcoreBaseComponents);
    const allAllowedScopes = new Set(allowed);

    let traversingComponent: string | null = null;
    let traversingBaseComponent: string | null = null;
    let traversingType: ChangelogChangeLabel | null = null;
    let incrementType: IncrementType = 'patch';

    logs.all.forEach((log) => {
      if (!log.body) return;

      const body = parseMarkdown(log.body);
      const changelogIndex = body.findIndex((item) => item.type === 'heading' && item.level === 2 && item.raw?.toLowerCase() === 'changelog');

      if (changelogIndex === -1) {
        logger(`No changelogs for ${log.message}`);
        return;
      }

      body.forEach((token: Token) => {
        if (token.type === 'heading' && token.level === 3 && token.raw && allAllowedScopes.has(token.raw.slice(9).toLowerCase())) { // slice(9) for remove @semcore scope
          traversingComponent = token.raw.toLowerCase();

          if (semcoreBaseComponents.includes(traversingComponent.slice(9))) {
            traversingBaseComponent = traversingComponent;
            traversingComponent = '@semcore/base-components';
          }

          if (!this.changelogs.components[traversingComponent]) {
            this.changelogs.components[traversingComponent] = { incrementType: 'patch', changelog: [] };
          }
        }
        if (token.type === 'heading' && token.level === 4 && token.raw && this.isType(token.raw) && traversingComponent !== null) {
          traversingType = token.raw;

          if (token.raw === 'Added' && incrementType !== 'major') {
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

              if (traversingBaseComponent && Array.isArray(descriptionFormatted)) {
                descriptionFormatted.unshift(`**${traversingBaseComponent.slice(9)}**: `);
              }

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
          traversingBaseComponent = null;
          traversingType = null;
        }
      });

      const newVersion = semver.inc(this.releaseTag, incrementType)!;
      this.changelogs.version = `${this.prefix}${newVersion}`;
    });
  }

  private get tag(): string {
    return `${this.prefix}${this.releaseTag}`;
  }

  public static async getRelease(versionTag: string) {
    let component = 'ui';

    if (versionTag.startsWith('icon')) {
      component = 'icon';
    } else if (versionTag.startsWith('illustration')) {
      component = 'illustration';
    }

    const changelogPath = resolvePath(dirname, '..', '..', '..', '..', 'semcore', component, 'CHANGELOG.md');
    const releaseChangelogString = await fs.readFile(changelogPath, 'utf8');
    const fullChangelog = component === 'ui'
      ? Changelog.releaseParser(
          releaseChangelogString,
          changelogPath,
        )
      : Changelog.componentParser(`@semcore/${component}`, releaseChangelogString, changelogPath);

    const releaseChangelog: ChangelogItem[] = [];
    const version = fullChangelog[0].version;

    for (let i = 0; i < fullChangelog.length; i++) {
      if (fullChangelog[i].version !== version) break;

      releaseChangelog.push(fullChangelog[i]);
    }

    return releaseChangelog.toSorted((a, b) => a.component.localeCompare(b.component));
  }

  public static componentParser(
    component: string,
    changelogText: string,
    changelogFilePath: string,
  ): ChangelogItem[] {
    const changelogAst = parseMarkdown(changelogText);

    const isChangelogValid =
      changelogAst[0].type === 'heading' &&
      changelogAst[0].level === 1 &&
      changelogAst[0].text.join('') === 'Changelog';

    if (!isChangelogValid) {
      throw new Error(`Invalid changelog file ${changelogFilePath}`);
    }

    const handledVersions = new Map<string, true>();
    const changelogs: ChangelogItem[] = [];

    let traversingVersion: string | null = null;
    let traversingChangeLabel: string | null = null;

    for (const token of changelogAst.slice(2)) {
      if (token.type === 'heading' && token.level === 2) {
        const [versionContainer, date] = token.text.join('').split(' - ');
        if (!versionContainer || !date) {
          throw new Error(
            `Unable to process "${token.text.join('')}" row of changelog ${changelogFilePath}`,
          );
        }

        const version = versionContainer.substring(1, versionContainer.length - 1);
        if (!isValidSemver(version)) {
          throw new Error(
            `Invalid version in "${token.text.join('')}" row of changelog ${changelogFilePath}`,
          );
        }
        traversingVersion = version;
        traversingChangeLabel = null;

        if (!dayjs(date).isValid() && date !== 'unreleased') {
          const tokenText = token.text.join('');
          const message = `Invalid date in "${tokenText}" (only YYYY-MM-DD or "unreleased" allowed) row of changelog ${changelogFilePath}`;
          throw new Error(message);
        }

        if (handledVersions.has(version)) {
          throw new Error(`Duplicated version "${version}" in changelog ${changelogFilePath}`);
        }

        changelogs.push({
          component: component,
          date,
          version,
          changes: [],
        });
        handledVersions.set(version, true);
      } else if (token.type === 'heading' && token.level === 3) {
        if (traversingVersion !== null) {
          traversingChangeLabel = token.text.join('');
        } else {
          const headingText = token.text.join('');
          throw new Error(
            `Unexpected heading of level 3 "${headingText}" in changelog ${changelogFilePath}`,
          );
        }
      } else if (traversingVersion && traversingChangeLabel && token.type === 'list') {
        for (const listItem of token.body) {
          const label = traversingChangeLabel as ChangelogChangeLabel;
          const descriptionFormatted = (Array.isArray(listItem) ? listItem[0] : listItem).text;
          const description = toMarkdown(descriptionFormatted);

          changelogs[changelogs.length - 1].changes.push({
            label,
            description,
            descriptionFormatted,
          });
        }
      } else {
        const stringifiedToken = JSON.stringify(token);
        const debugHint = `on version ${traversingVersion} and change type label ${traversingChangeLabel}`;
        throw new Error(
          `Unexpected markdown token ${stringifiedToken} (${debugHint}) in changelog ${changelogFilePath}`,
        );
      }
    }

    return changelogs;
  }

  public static releaseParser(
    changelogText: string,
    changelogFilePath: string,
  ): ChangelogItem[] {
    const changelogAst = parseMarkdown(changelogText);

    const lastItem = changelogAst[changelogAst.length - 1];
    const isChangelogValid =
      lastItem.type === 'list' &&
      lastItem.body.length === 1 &&
      lastItem.body[0].text.length === 2 &&
      typeof lastItem.body[0].text[0] !== 'string' &&
      'text' in lastItem.body[0].text[0] &&
      lastItem.body[0].text[0].text.length === 1 &&
      lastItem.body[0].text[0].text[0] === 'Added' &&
      String(lastItem.body[0].text[1]).trim() === 'Initial release';

    if (!isChangelogValid) {
      throw new Error(`Invalid changelog file ${changelogFilePath}`);
    }

    const handledVersions = new Map<string, true>();
    const changelogs: ChangelogItem[] = [];

    let traversingComponent: string | null = null;
    let traversingVersion: string | null = null;
    let traversingDate: string | null = null;
    traversingComponent = null;
    traversingVersion = null;
    traversingDate = null;
    for (const token of changelogAst) {
      if (token.type === 'heading' && token.level === 2) {
        const [versionContainer, date] = token.text.join('').split(' - ');
        if (!versionContainer || !date) {
          throw new Error(
            `Unable to process "${token.text.join('')}" row of changelog ${changelogFilePath}`,
          );
        }

        const version = versionContainer.substring(1, versionContainer.length - 1);
        if (!isValidSemver(version)) {
          throw new Error(
            `Invalid version in "${token.text.join('')}" row of changelog ${changelogFilePath}`,
          );
        }
        traversingVersion = version;
        traversingDate = date;

        if (!dayjs(date).isValid() && date !== 'unreleased') {
          const tokenText = token.text.join('');
          const message = `Invalid date in "${tokenText}" (only YYYY-MM-DD or "unreleased" allowed) row of changelog ${changelogFilePath}`;
          throw new Error(message);
        }

        if (handledVersions.has(version)) {
          throw new Error(`Duplicated version "${version}" in changelog ${changelogFilePath}`);
        }

        handledVersions.set(version, true);
      } else if (token.type === 'heading' && token.level === 3 && traversingVersion !== null) {
        const component = token.text.join();
        traversingComponent = component;
      } else if (
        traversingVersion &&
        traversingDate &&
        traversingComponent &&
        token.type === 'list'
      ) {
        for (const item of token.body) {
          if (item.type !== 'listitem') {
            throw new Error(
              `Unexpected list item token ${JSON.stringify(item)} in changelog ${changelogFilePath}`,
            );
          }

          if (Changelog.isMajor(traversingVersion)) {
            if (
              changelogs[changelogs.length - 1]?.version !== traversingVersion ||
              changelogs[changelogs.length - 1]?.component !== traversingComponent
            ) {
              changelogs.push({
                component: traversingComponent,
                date: traversingDate,
                version: traversingVersion,
                changes: [],
              });
            }

            changelogs[changelogs.length - 1].changes.push({
              label: null,
              description: toMarkdown(item.text as Token[]).trim(),
              descriptionFormatted: item.text,
            });

            continue;
          }

          const prefix = item.text[0];
          const restText = item.text.slice(1);

          if ((typeof prefix === 'string' || prefix.type !== 'strong')) {
            throw new Error(
              `Invalid prefix for changelog change. Expected strong text, got ${JSON.stringify(
                prefix,
              )} in changelog ${changelogFilePath}`,
            );
          }

          const label = (item.text[0] as any).text[0];
          const descriptionFormatted = restText as Token[];
          const description = toMarkdown(descriptionFormatted).trim();

          if (
            changelogs[changelogs.length - 1]?.version !== traversingVersion ||
            changelogs[changelogs.length - 1]?.component !== traversingComponent
          ) {
            changelogs.push({
              component: traversingComponent,
              date: traversingDate,
              version: traversingVersion,
              changes: [],
            });
          }

          changelogs[changelogs.length - 1].changes.push({
            label,
            description,
            descriptionFormatted,
          });
        }
      } else {
        throw new Error(
          `Unexpected markdown token ${JSON.stringify(token)} in changelog ${changelogFilePath}`,
        );
      }
    }

    return changelogs;
  }

  public static serializeComponent(changelogs: (ChangelogItem | string)[]): Token[] {
    const heading: Token[] = [
      { type: 'heading', text: ['Changelog'], level: 1, raw: 'Changelog' },
      {
        type: 'paragraph',
        text: [
          'CHANGELOG.md standards are inspired by ',
          {
            type: 'link',
            href: 'https://keepachangelog.com/en/1.0.0/',
            title: null,
            text: ['keepachangelog.com'],
          },
          '.',
        ],
      },
    ];
    const body: Token[] = changelogs.flatMap((changelog): Token[] => {
      if (typeof changelog === 'string') {
        return [
          {
            type: 'paragraph',
            text: [changelog],
          },
        ];
      }
      const versionHeading: Token = {
        type: 'heading',
        level: 2,
        text: [`[${changelog.version}] - ${changelog.date}`],
        tokens: [
          {
            type: 'text',
            text: [`[${changelog.version}] - ${changelog.date}`],
          },
        ],
      };
      const byLabel = changelog.changes.reduce<Partial<{ [changeLabel in NonNullable<ChangelogChangeLabel>]: ChangelogChange[] }>>(
        (acc, change) => {
          if (change.label) {
            acc[change.label] = [...(acc[change.label] || []), change];
          }

          return acc;
        },
        {},
      );
      const changes = Object.values(byLabel);

      const sorted = changes.sort(([a], [b]) => {
        if (a.label !== b.label) {
          if (a.label === 'BREAK') return -1;
          if (b.label === 'BREAK') return 1;
        }
        return 0;
      });

      const changesList = sorted.flatMap((changes): Token[] => {
        const label = changes[0].label ?? '';

        return [
          {
            type: 'heading',
            level: 3,
            text: [label],
            tokens: [{ type: 'text', text: [label] }],
          },
          {
            type: 'list',
            ordered: false,
            body: changes.map(
              (change): ListItem => ({
                type: 'listitem',
                text: change.descriptionFormatted,
              }),
            ),
          },
        ];
      });

      return [versionHeading, ...changesList];
    });

    return [...heading, ...body];
  }

  public static serializeRelease(changelogs: ChangelogItem[]): Token[] {
    const result: Token[] = [];

    let currentVersion: string | null = null;
    let currentDate: string | null = null;
    let currentComponent: string | null = null;

    changelogs
      .toSorted((a, b) => b.date.localeCompare(a.date))
      .forEach((changelog) => {
        if (currentDate === null || currentDate !== changelog.date || currentVersion !== changelog.version) {
          const versionHeading: Token = {
            type: 'heading',
            level: 2,
            text: [`[${changelog.version}] - ${changelog.date}`],
            tokens: [
              {
                type: 'text',
                text: [`[${changelog.version}] - ${changelog.date}`],
              },
            ],
          };

          result.push(versionHeading);

          currentDate = changelog.date;
          currentVersion = changelog.version;
          currentComponent = null;
        }

        if (currentComponent === null || currentComponent !== changelog.component) {
          const componentHeading: Token = {
            type: 'heading',
            level: 3,
            text: [changelog.component],
            tokens: [{ type: 'text', text: [changelog.component] }],
          };

          result.push(componentHeading);

          currentComponent = changelog.component;
        }

        const componentChanges = changelog.changes.map((change): ListItem => {
          if (!change.description) {
            throw new Error(`Got empty change description ${JSON.stringify(change)}`);
          }

          const text: (Token | string)[] = change.label
            ? [
                {
                  type: 'strong',
                  text: [change.label],
                  tokens: [{ type: 'text', text: [change.label] }],
                },
                ' ',
                ...change.descriptionFormatted,
              ]
            : change.descriptionFormatted;

          return {
            type: 'listitem',
            text,
          };
        });
        const componentChangesList: Token = {
          type: 'list',
          ordered: false,
          body: componentChanges,
        };

        result.push(componentChangesList);
      });

    return result;
  }

  private isType(type: string): type is ChangelogChangeLabel {
    if (changeTypesSet.has(type as any)) {
      return true;
    }

    return false;
  }

  private static isMajor(version: string): boolean {
    return /^\d+\.0\.0$/.test(version);
  }
}
