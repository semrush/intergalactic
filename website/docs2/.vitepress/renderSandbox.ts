import { createMarkdownRenderer } from 'vitepress/dist/node/index';
import { resolve as resolvePath } from 'path';
import parseImports from 'parse-es-import';

const markdownRenderer = await createMarkdownRenderer(resolvePath(__dirname, '..'));

const clearScriptTagFromTags = (scriptTag: string) => {
  const lines = scriptTag.split('\n');
  const code = lines
    .slice(
      lines.findIndex((line) => line.includes('<script')) + 1,
      lines.findLastIndex((line) => line.includes('</script')),
    )
    .join('\n');
  return code;
};
const makePlaygroundExecutedCode = (code: string, playgroundId: string) => {
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
    `;\n setTimeout(() => { createReactRoot(document.getElementById("${playgroundId}")).render(<Demo />); }, 0); }`
  );
};

export const renderSandbox = (tokenList: any[], index: number, htmlTagName: string) => {
  const renderFunc = (tokens: any[], idx: number, htmlTag: string) => {
    if (tokens[idx].nesting === 1) {
      const scriptTag = tokens[idx + 1].content;
      const playgroundId = 'playground_' + Math.random().toString().substring(2);
      const code = clearScriptTagFromTags(scriptTag);
      const executedCode = makePlaygroundExecutedCode(code, playgroundId);
      const lines = scriptTag.split('\n');
      const scriptHead = lines[lines.findIndex((line) => line.includes('<script'))];
      const hideCode = scriptHead.includes('hide-code') ? 'true' : '';
      const lang = /lang="([^"]+)"/.exec(scriptHead)?.[1];
      const params = /params="([^"]+)"/.exec(scriptHead)?.[1];
      const meta = (lang ?? '') + (params ?? '');

      const highlightedCode = encodeURIComponent(
        markdownRenderer.render('```' + meta + '\n' + code + '\n```\n'),
      );
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

      // const lastScriptToken = [
      //   tokens.filter(
      //     (token) =>
      //       (token.content.includes('<script>') || token.content.includes('<script ')) &&
      //       token.content.includes('</script>'),
      //   ),
      // ].pop();

      // if (idx + 1 === lastScriptTokenIndex) {
      //   for (let i = 0; i < lastScriptTokenIndex; i++) {
      //     const tokenContent = tokens[i].content;
      //     if (
      //       (tokenContent.includes('<script>') || tokenContent.includes('<script ')) &&
      //       tokenContent.includes('</script>')
      //     ) {
      //       tokens[i].content = '';
      //     }
      //   }
      // }
      console.log(idx, lastScriptTokenIndex);
      // let codeAppended = false;
      // let singleScriptTag = false;
      // for (let i = 0; i < tokens.length; i++) {
      //   const tokenContent = tokens[i].content;
      //   if (
      //     (tokenContent.includes('<script>') || tokenContent.includes('<script ')) &&
      //     tokenContent.includes('</script>')
      //   ) {
      //     codeAppended = true;
      //     tokens[i].content = tokens[i].content.replace('</script>', executedCode + '</script>');
      //     singleScriptTag = idx + 1 === i;
      //     console.log('append', singleScriptTag);
      //     if (!singleScriptTag) {
      //       console.log(tokens[i].content);
      //     }
      //     break;
      //   }
      // }
      // if (!codeAppended || singleScriptTag) {
      //   console.log('set');
      //   tokens[idx + 1].content = `<script lang="tsx">${executedCode}</script>`;
      // } else if (!singleScriptTag) {
      //   tokens[idx + 1].content = '';
      // }
      return `<Sandbox playgroundId="${playgroundId}" htmlCode="${highlightedCode}" rawCode="${code}" hideCode="${hideCode}">`;
    }
    return '</Sandbox>';
  };
  return renderFunc(tokenList, index, htmlTagName);
};
