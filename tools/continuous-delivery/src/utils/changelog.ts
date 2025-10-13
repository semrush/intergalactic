import type { Token } from 'marked-ast';
import { parse as parseMarkdown } from 'marked-ast';
import Git from 'simple-git';

import { allowedScopes } from './allowedScopes';
import { log as logger } from '../utils';
const git = Git();

export type ComponentName = string;
type Version = string;

type ChangelogChangeLabel = 'Added' | 'Changed' | 'Fixed' | 'BREAK' | null;

type ChangelogChange = {
  component: string;
  date: string | 'unreleased';
  version: Version;
  label: ChangelogChangeLabel;
  description: string;
  descriptionFormatted: (string | Token)[];
  isAutomatic: boolean;
};

type CollectedChangelog = {
  version: Version;
  components: ChangelogChange[];
};

export class Changelog {
  constructor(
    private readonly releaseTag: string,
    private readonly componentReleases: Record<ComponentName, Version>,
  ) {}

  public async collectFromHistory(): Promise<CollectedChangelog> {
    const logs = await git.log({ from: this.releaseTag });
    const { specialScopes, toolsComponents, semcoreComponents } = await allowedScopes();
    const allAllowedScopes = [...specialScopes, ...semcoreComponents, ...toolsComponents];

    const result: CollectedChangelog = {
      version: this.releaseTag,
      components: [],
    };

    logs.all.forEach((log) => {
      if (!log.body) return;

      const body = parseMarkdown(log.body);
      const changelogIndex = body.findIndex((item) => item.type === 'heading' && item.level === 2 && item.raw === 'Changelog');

      if (changelogIndex === -1) {
        logger(`No changelogs for ${log.message}`);
        return;
      }

      const changelog = body[changelogIndex + 1];

      if (!changelog.type === '') {}

      console.log(body);
    });

    return result;

    // const regexp = new RegExp(/\[(.*?)\]/gi);
    // const taskIds = new Set<string>();
    // const { specialScopes, toolsComponents, semcoreComponents } = await allowedScopes();
    // const allAllowedScopes = [...specialScopes, ...semcoreComponents, ...toolsComponents];
    //
    // logs.all.forEach((item) => {
    //   const result = [...item.message.matchAll(regexp)][0];
    //
    //   if (result?.[1] && !allAllowedScopes.includes(result[1])) {
    //     taskIds.add(result[1]);
    //   }
    // });
    //
    // const taskIdsArray = [...taskIds];
  }
}
