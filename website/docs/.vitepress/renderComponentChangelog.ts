import { createMarkdownRenderer } from 'vitepress/dist/node/index';
import { resolve as resolvePath } from 'node:path';
import fs from 'node:fs';

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

      return markdownRenderer.render(changelogBody);
    }
    return [];
  };
  return renderFunc(tokenList, index);
};
