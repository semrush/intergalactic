import { createMarkdownRenderer } from 'vitepress/dist/node/index';
import { resolve as resolvePath } from 'path';
import parseImports from 'parse-es-import';
import { transformSync } from 'esbuild';
import fs from 'fs';
import { codeTheme } from './code-theme';

const markdownRenderer = await createMarkdownRenderer(resolvePath(__dirname, '..'), {
  theme: codeTheme,
});

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
const makePlaygroundExecutableCode = (
  codeWithTypes: string,
  playgroundId: string,
  entryPoint: string,
) => {
  if (codeWithTypes.includes('export Demo from ')) {
    codeWithTypes = codeWithTypes.replace('export Demo from ', 'import Demo from ');
    codeWithTypes = codeWithTypes += '; Demo;';
  }
  const { code } = transformSync(codeWithTypes, { loader: 'tsx' });
  const { imports } = parseImports(code);
  const importLines: string[] = [];
  const importAliasLines: string[] = [];
  let codeWithoutImports = code;
  let demoVariableImport = '';
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
        if (name === 'Demo') {
          demoVariableImport = importStatement.moduleName;
        }
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
  const executableCode =
    importLines.join('\n') +
    '; {\n' +
    importAliasLines.join('\n') +
    codeWithoutImports +
    `;\n globalThis["render_${playgroundId}"] = (mountNode) => { globalThis.createReactRoot?.(mountNode).render(<${entryPoint} />); }; }`;

  return {
    executableCode,
    demoVariableImport,
  };
};

export const renderSandbox = (
  tokenList: any[],
  index: number,
  htmlTagName: string,
  renderNothing = false,
  state?: { relativePath: string },
  role?: string,
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
      // const src = /src="([^"]+)"/.exec(scriptHead)?.[1];
      const meta = (lang ?? '') + (params ?? '');

      // let code = '';

      // if (src) {
      //   const pathToCurrentDir = state.relativePath.split('/').slice(0, -1);
      //   code = fs
      //     .readFileSync(resolvePath('docs', ...pathToCurrentDir, src), 'utf8')
      //     .replace('export default Demo;\n', '');
      // } else {
      //   code = clearScriptTagFromTags(scriptTag);
      // }
      const code = clearScriptTagFromTags(scriptTag);

      const playgroundId = 'playground_' + Math.random().toString().substring(2);
      const { executableCode, demoVariableImport } = makePlaygroundExecutableCode(
        code,
        playgroundId,
        htmlTag === 'sandbox' ? 'Demo' : 'App',
      );

      let displayedCode = code;
      if (displayedCode.includes('export Demo from ')) {
        if (demoVariableImport.startsWith('stories')) {
          displayedCode = fs.readFileSync(resolvePath('..', demoVariableImport), 'utf8');
        } else {
          const pathToCurrentDir = state?.relativePath.split('/').slice(0, -1) ?? '.';
          displayedCode = fs.readFileSync(
            resolvePath('docs', ...pathToCurrentDir, demoVariableImport),
            'utf8',
          );
        }
      }

      const htmlCode = markdownRenderer.render('```' + meta + '\n' + displayedCode + '\n```\n');
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
        const allExecutableCode = tokens
          .map((token) => token.executableCode)
          .filter(Boolean)
          .join(';\n');
        tokens[
          idx + 1
        ].content = `<script lang="tsx">${allExecutableCode};${executableCode}</script>`;
      } else {
        tokens[idx + 1].content = '';
        tokens[idx + 1].executableCode = executableCode;
      }

      const encodedHtmlCode = btoa(htmlCode);
      const encodedRawCode = btoa(displayedCode);
      return `<Sandbox playgroundId="${playgroundId}" role="${role}" hideCode="${hideCode}" htmlCode="${encodedHtmlCode}" rawCode="${encodedRawCode}" :stylesIsolation="${
        htmlTag === 'sandbox'
      }">`;
    }
    return '</Sandbox>';
  };
  return renderFunc(tokenList, index, htmlTagName);
};
