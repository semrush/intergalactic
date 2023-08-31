import { createMarkdownRenderer } from 'vitepress/dist/node/index';
import { resolve as resolvePath } from 'path';
import parseImports from 'parse-es-import';

const markdownRenderer = await createMarkdownRenderer(resolvePath(__dirname, '..'));

export const renderTypescript = (tokenList: any[], index: number) => {
  const renderFunc = (tokens: any[], idx: number) => {
    const token = tokens[idx];
    if (token.type === 'container_typescript_open') {
      const type = token.info.split(':::')[0].split(' typescript ')[0].trim();
      return `<TypesView type="${type}" :types={types} />`;
    }
    return []
  };
  return renderFunc(tokenList, index);
};
