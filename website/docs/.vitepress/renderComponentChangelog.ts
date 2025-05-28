import { createMarkdownRenderer } from 'vitepress/dist/node/index';
import { resolve as resolvePath } from 'path';
import fs from 'fs';

const markdownRenderer = await createMarkdownRenderer(resolvePath(__dirname, '..'));
const changelogsCache: { [key: string]: string } = {};

export const renderComponentChangelog = (tokenList: any[], index: number) => {
  const renderFunc = (tokens: any[], idx: number) => {
    const token = tokens[idx];
    if (token.type === 'container_changelog_open') {
      const component = token.info.split(':::')[0].split('changelog')[1].trim();
      const changelogPath = resolvePath(__dirname, `../../../semcore/${component}/CHANGELOG.md`);
      let changelogFile = changelogsCache[changelogPath];
      if (!changelogFile) {
        try {
          changelogFile = fs.readFileSync(changelogPath, 'utf-8');
        } catch (error) {
          console.error(error);
          throw new Error(
            `Unable to find changelog for ${component} (searching in ${changelogPath})).`,
          );
        }
      }
      const changelogBody = changelogFile.substring(changelogFile.indexOf('##'));
      const changelogItems = changelogBody.split('## [');
      const changelogs = [];
      const updateVersionChangelogs = [];

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
