import fs from 'fs';
import { execSync } from 'node:child_process';
import { resolve as resolvePath } from 'path';

import { createMarkdownRenderer } from 'vitepress/dist/node/index';

const markdownRenderer = await createMarkdownRenderer(resolvePath(__dirname, '..'));
const changelogsCache: { [key: string]: string } = {};

export const renderComponentChangelog = (tokenList: any[], index: number) => {
  const renderFunc = (tokens: any[], idx: number) => {
    const token = tokens[idx];
    if (token.type === 'container_changelog_open') {
      const componentNameParts = token.info.split(':::')[0].split('changelog')[1].trim().split('__');
      const component = (componentNameParts[0] === 'base-components' && componentNameParts.length > 1) ? componentNameParts[1] : componentNameParts[0];

      const baseChangelogPath = (componentNameParts[0] === 'base-components' && componentNameParts.length > 1) ? resolvePath(__dirname, '..', '..', '..', 'semcore', 'base-components', 'CHANGELOG.md') : null;
      const changelogPath = baseChangelogPath
        ? baseChangelogPath
        : resolvePath(execSync(`pnpm --filter @semcore/${component} exec pwd`, { encoding: 'utf8' }).trim(), 'CHANGELOG.md');

      let changelogBody = changelogsCache[changelogPath];
      let baseChangelogBody = baseChangelogPath ? changelogsCache[baseChangelogPath] : undefined;
      if (!changelogBody) {
        try {
          const componentLogFile = fs.readFileSync(changelogPath, 'utf-8');

          changelogBody = componentLogFile.substring(componentLogFile.indexOf('##'));
        } catch (error) {
          console.error(error);
          throw new Error(
            `Unable to find changelog for ${component} (searching in ${changelogPath})).`,
          );
        }
      }
      if (!baseChangelogBody && baseChangelogPath) {
        try {
          const baseChangelogFile = fs.readFileSync(baseChangelogPath, 'utf-8');
          baseChangelogBody = baseChangelogFile.substring(baseChangelogFile.indexOf('##'));
        } catch (error) {
          console.error(error);
          throw new Error(
            `Unable to find changelog for ${component} (searching in ${changelogPath})).`,
          );
        }
      }
      const baseChangelogItems = baseChangelogBody?.split('## [');
      const changelogItems = changelogBody.split('## [');
      const changelogs = [];
      const updateVersionChangelogs = [];

      baseChangelogItems?.forEach((item) => {
        if (item.includes(`**${component}**`)) {
          const itemRows = item.split('\n');
          const versionAndDate = itemRows[0]?.trim().replace(']', '').replace('[', '') ?? '';
          const [version, date] = versionAndDate.split(' - ');
          const niceDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(date));

          const hasBreaking = item.includes('### Break') || item.includes('### BREAK');
          const breakingIcon = '<span role="img" aria-label="breaking">🅱️</span>';

          changelogs.push(`## ${version} ${hasBreaking ? breakingIcon : ''} (${niceDate})\n`);

          let type = '';
          let addedType = false;
          for (let i = 1; i < itemRows.length; i++) {
            if (itemRows[i].startsWith('###')) {
              type = itemRows[i];
              addedType = false;
              continue;
            }

            if (itemRows[i].startsWith(`- **${component}**:`)) {
              if (!addedType) {
                changelogs.push(type);
                addedType = true;
              }
              changelogs.push(itemRows[i].replace(`- **${component}**:`, '- '));
            }
          }
        }
      });

      changelogItems.forEach((item) => {
        if (item) {
          const itemRows = item.split('\n');
          const versionAndDate = itemRows[0]?.trim().replace(']', '').replace('[', '') ?? '';
          const [version, date] = versionAndDate.split(' - ');
          const niceDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(date));

          if (
            item.includes('- Version minor update due to children dependencies') ||
            item.includes('- Version patch update due to children dependencies') ||
            item.includes('- Version preminor update due to children dependencies') ||
            item.includes('- Version prepatch update due to children dependencies') ||
            item.includes('- Version prerelease update due to children dependencies') ||
            (itemRows.length === 3 && itemRows[1] === '' && itemRows[2] === '')
          ) {
            itemRows[0] = `### ${version} (${niceDate})`;
            updateVersionChangelogs.push(itemRows.filter((row) => !row.includes('Changed')));
          } else {
            const hasBreaking = item.includes('### Break') || item.includes('### BREAK');
            const breakingIcon = '<span role="img" aria-label="breaking">🅱️</span>';

            itemRows[0] = `## ${version} ${hasBreaking ? breakingIcon : ''} (${niceDate})`;

            if (updateVersionChangelogs.length > 0) {
              changelogs.push(`\n\n<div class="collapsed-versions">\n\n`);
              changelogs.push(updateVersionChangelogs[0][0].replace('###', '##'));
              changelogs.push(
                `\n\n::: details ${updateVersionChangelogs.length} release${
                  updateVersionChangelogs.length > 1 ? 's' : ''
                } with dependency updates only`,
              );
              changelogs.push(updateVersionChangelogs.map((item) => item.join('\n')).join('\n'));
              changelogs.push(':::\n</div>\n\n');

              updateVersionChangelogs.length = 0;
            }

            changelogs.push(...itemRows);

            if (version === '16.0.0') {
              changelogs.push('::: tip Versioning update 🔄');
              changelogs.push(
                'Starting with `Intergalactic v16`, major versions of components are synchronized with the library version.',
              );
              changelogs.push(':::');
            }
          }
        }
      });

      return markdownRenderer.render(changelogs.join('\n'));
    }
    return [];
  };
  return renderFunc(tokenList, index);
};
