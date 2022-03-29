import dayjs from 'dayjs';
import { parse as parseMarkdown } from 'marked-ast';
import { isValidSemver } from '../utils';
import { Changelog, ChangelogChangeLabel } from '../types';
import { toMarkdown } from 'marked-ast-markdown';

export const componentChangelogParser = (
  component: string,
  changelogText: string,
  changelogFilePath: string,
): Changelog[] => {
  const changelogAst = parseMarkdown(changelogText);

  const isChangelogValid =
    changelogAst[0].type === 'heading' &&
    changelogAst[0].level === 1 &&
    changelogAst[0].text.join('') === 'Changelog';

  if (!isChangelogValid) {
    throw new Error(`Invalid changelog file ${changelogFilePath}`);
  }

  const handledVersions = new Map<string, true>();
  const changelogs: Changelog[] = [];

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
        const version = traversingVersion as ChangelogChangeLabel;
        const label = traversingChangeLabel as ChangelogChangeLabel;
        const descriptionFormatted = (Array.isArray(listItem) ? listItem[0] : listItem).text;
        const description = toMarkdown(descriptionFormatted);
        const isAutomatic = description.includes('update due to children dependencies update');

        changelogs[changelogs.length - 1].changes.push({
          component,
          version,
          label,
          description,
          descriptionFormatted,
          isAutomatic,
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
};
