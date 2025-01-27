import { createMarkdownRenderer } from 'vitepress/dist/node/index';
import fs from 'node:fs';
import { resolve as resolvePath } from 'node:path';

const markdownRenderer = await createMarkdownRenderer(resolvePath(__dirname, '..'));

export const renderLegacyEmails = (tokenList: any[], index: number) => {
  const renderFunc = (tokens: any[], idx: number) => {
    const token = tokens[idx];
    if (token.type === 'container_legacy_emails_view_open') {
      const [_, compiledExamplePath, sourceExamplePath] = token.info.trim().split(' ');
      const compiledExample = fs.readFileSync(
        resolvePath(__dirname, '../../../semcore/email/', compiledExamplePath),
        'utf-8',
      );
      const sourceExample = fs.readFileSync(
        resolvePath(__dirname, '../../../semcore/email/', sourceExamplePath),
        'utf-8',
      );
      const highlightedSourceCode = markdownRenderer.render(
        '```html' + '\n' + sourceExample + '\n```\n',
      );

      return `<LegacyEmailsView compiledCode="${btoa(
        encodeURIComponent(compiledExample),
      )}" sourceCode="${btoa(encodeURIComponent(highlightedSourceCode))}">`;
    }
    return '</LegacyEmailsView>';
  };
  return renderFunc(tokenList, index);
};
