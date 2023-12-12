import { createMarkdownRenderer } from 'vitepress/dist/node/index';
import { resolve as resolvePath } from 'path';
import parseImports from 'parse-es-import';
import { transformSync } from 'esbuild';
import fs from 'fs';

const markdownRenderer = await createMarkdownRenderer(resolvePath(__dirname, '..'));

const findLastIndex = <T>(arr: T[], predicate: (item: T) => boolean): number => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) return i;
  }
  return -1;
};

const clearScriptTagFromTags = (scriptTag: string) => {
  const lines = scriptTag.split('\n');
  const code = lines
    .slice(
      lines.findIndex((line) => line.includes('<script')) + 1,
      findLastIndex(lines, (line) => line.includes('</script')),
    )
    .join('\n');
  return code;
};
const makePlaygroundExecutedCode = (
  codeWithTypes: string,
  playgroundId: string,
  entryPoint: string,
) => {
  const { code } = transformSync(codeWithTypes, { loader: 'tsx' });
  const { imports } = parseImports(code);
  const importLines: string[] = [];
  const importAliasLines: string[] = [];
  let codeWithoutImports = code;
  {
    let importIndex = 0;
    for (const importStatement of imports) {
      const placeholder = Array(importStatement.endIndex - importStatement.startIndex)
        .fill(' ')
        .join('');
      codeWithoutImports =
        codeWithoutImports.substring(0, importStatement.startIndex) +
        placeholder +
        codeWithoutImports.substring(importStatement.endIndex);
      if (importStatement.starImport) {
        const name = importStatement.starImport;
        importStatement.starImport = `__import_${playgroundId}_${importIndex++}`;
        importLines.push(
          `import * as ${importStatement.starImport} from '${importStatement.moduleName}';`,
        );
        importAliasLines.push(`const ${name} = ${importStatement.starImport};`);
      } else if (importStatement.defaultImport) {
        const name = importStatement.defaultImport;
        importStatement.defaultImport = `__import_${playgroundId}_${importIndex++}`;
        importLines.push(
          `import ${importStatement.defaultImport} from '${importStatement.moduleName}';`,
        );
        importAliasLines.push(`const ${name} = ${importStatement.defaultImport};`);
      }
      for (let i = 0; i < importStatement.namedImports.length; i++) {
        const alias = importStatement.namedImports[i].alias || importStatement.namedImports[i].name;
        importStatement.namedImports[i].alias = `__import_${playgroundId}_${importIndex++}`;
        importLines.push(
          `import { ${importStatement.namedImports[i].name} as ${importStatement.namedImports[i].alias} } from '${importStatement.moduleName}';`,
        );
        importAliasLines.push(`const ${alias} = ${importStatement.namedImports[i].alias};`);
      }
    }
  }
  return (
    importLines.join('\n') +
    '; {\n' +
    importAliasLines.join('\n') +
    codeWithoutImports +
    `;\n globalThis["render_${playgroundId}"] = () => { globalThis.createReactRoot?.(globalThis.document?.getElementById("${playgroundId}")).render(<${entryPoint} />); }; }`
  );
};

export const renderSandbox = (
  tokenList: any[],
  index: number,
  htmlTagName: string,
  renderNothing = false,
  state?: { relativePath: string },
) => {
  const renderFunc = (tokens: any[], idx: number, htmlTag: string) => {
    if (renderNothing) return '';
    if (tokens[idx].nesting === 1) {
      const scriptTag = tokens[idx + 1].content;
      const lines = scriptTag.split('\n');
      const scriptHead = lines[lines.findIndex((line) => line.includes('<script'))];
      const hideCode = htmlTagName !== 'sandbox';
      const lang = /lang="([^"]+)"/.exec(scriptHead)?.[1];
      const params = /params="([^"]+)"/.exec(scriptHead)?.[1];
      const src = /src="([^"]+)"/.exec(scriptHead)?.[1];
      const meta = (lang ?? '') + (params ?? '');

      let code = '';

      if (src) {
        const pathToCurrentDir = state.relativePath.split('/').slice(0, -1);
        code = fs.readFileSync(resolvePath('docs', ...pathToCurrentDir, src), 'utf8');
      } else {
        code = clearScriptTagFromTags(scriptTag);
      }

      const playgroundId = 'playground_' + Math.random().toString().substring(2);
      const executedCode = makePlaygroundExecutedCode(
        code,
        playgroundId,
        htmlTag === 'sandbox' ? 'Demo' : 'App',
      );

      const htmlCode = markdownRenderer.render('```' + meta + '\n' + code + '\n```\n');
      let lastScriptTokenIndex = -1;
      for (let i = tokens.length - 1; i >= 0; i--) {
        const tokenContent = tokens[i].content;
        if (
          (tokenContent.includes('<script>') || tokenContent.includes('<script ')) &&
          tokenContent.includes('</script>')
        ) {
          lastScriptTokenIndex = i;
          break;
        }
      }

      if (lastScriptTokenIndex === idx + 1) {
        const allExecutedCode = tokens
          .map((token) => token.executedCode)
          .filter(Boolean)
          .join(';\n');
        tokens[idx + 1].content = `<script lang="tsx">${allExecutedCode};${executedCode}</script>`;
      } else {
        tokens[idx + 1].content = '';
        tokens[idx + 1].executedCode = executedCode;
      }

      // const encodedHtmlCode = atob(encodeURIComponent(htmlCode));
      // const encodedRawCode = atob(encodeURIComponent(code));

      const encodedHtmlCode = btoa(htmlCode);
      const encodedRawCode = btoa(code);
      return `<Sandbox playgroundId="${playgroundId}" hideCode="${hideCode}" htmlCode="${encodedHtmlCode}" rawCode="${encodedRawCode}">`;
    }
    return '</Sandbox>';
  };
  return renderFunc(tokenList, index, htmlTagName);
};
