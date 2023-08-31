import glob from 'fast-glob';
import fs from 'fs/promises';
import { resolve as resolvePath, dirname as resolveDirname } from 'path';

const markdowns = await glob('**/*.md', { cwd: 'docs' });
const tabs: { [fromPath: string]: string[] } = {};
await Promise.all(
  markdowns.map(async (path) => {
    let content = await fs.readFile(`docs/${path}`, 'utf-8');
    content = content.replace(/\n@#/g, '\n#');

    let lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].startsWith(' ')) {
        lines[i] = lines[i].replace(/{{/g, '{');
        lines[i] = lines[i].replace(/}}/g, '}');
      }
      if (lines[i].startsWith('> 🚨 ')) {
        lines[i] = lines[i].replace('> 🚨 ', ':rotating_light: ');
        lines.splice(i + 1, 0, ':::');
        if (lines[i + 2] !== '') lines.splice(i + 1, 0, '');

        lines.splice(i, 0, '::: warning');
      }
      if (lines[i].startsWith('> ⚠️ ')) {
        lines[i] = lines[i].replace('> ⚠️ ', ':warning: ');
        lines.splice(i + 1, 0, ':::');
        if (lines[i + 2] !== '') lines.splice(i + 1, 0, '');

        lines.splice(i, 0, '::: warning');
      }
      if (lines[i].startsWith('>')) {
        const from = i;
        let to = i;
        while (lines[to].startsWith('>')) to++;
        const quoteLines = lines.slice(from, to).map((line) => line.replace(/>\s*/, ''));
        lines.splice(i, quoteLines.length, '::: tip', ...quoteLines, ':::');
      }
      if (lines[i].startsWith('@example ')) {
        const exampleName = lines[i].split(' ')[1];
        const examplePath = resolvePath(
          'docs',
          resolveDirname(path),
          'examples',
          `${exampleName}.tsx`,
        );
        let exampleCode: string | null = null;
        try {
          exampleCode = await fs.readFile(examplePath, 'utf-8');
        } catch {}
        if (!exampleCode) continue;

        if (exampleCode.endsWith('\n')) {
          exampleCode = exampleCode.substring(0, exampleCode.length - 1);
        }
        exampleCode = exampleCode.replace('export default function()', 'const Demo = () =>');
        exampleCode = exampleCode.replace('export default function ()', 'const Demo = () =>');
        exampleCode = exampleCode.replace('export default Demo;', '');

        const newLines = [
          '::: sandbox',
          '',
          '<script lang="tsx">',
          ...exampleCode.split('\n'),
          '</script>',
          '',
          ':::',
        ];
        lines.splice(i, 1, ...newLines);
        try {
          await fs.rm(resolvePath('docs2', resolveDirname(path), 'examples', `${exampleName}.tsx`));
        } catch {}
      }
      if (lines[i].startsWith('@typescript ')) {
        const typeName = lines[i].split(' ')[1];
        if (
          !lines.some(
            (line) =>
              line.trim() ===
              "<script setup>import { data as types } from '@types.data.ts';</script>",
          )
        ) {
          lines.push("<script setup>import { data as types } from '@types.data.ts';</script>");
        }
        lines.splice(i, 1, `<TypesView type="${typeName}" :types={...types} />`);
      }
      if (lines[i].startsWith('@table-caption ')) {
        lines[i] = lines[i].replace('@table-caption ', 'Table: ');
      }
      if (lines[i].startsWith('@import ')) {
      }
      if (lines[i].startsWith('@changelog ')) {
      }
    }
    let removeFile = false;
    if (content.includes('@page ')) {
      const pages = lines
        .filter((line) => line.startsWith('@page '))
        .map((line) => line.split(' ')[1]);
      tabs[resolvePath('docs2', path)] = await Promise.all(
        pages.map(async (subPath) => {
          try {
            const stat = await fs.stat(
              resolvePath(resolveDirname(resolvePath('docs2', path)), subPath),
            );
            if (stat.isDirectory()) {
              return resolvePath(
                resolveDirname(resolvePath('docs2', path)),
                subPath,
                subPath + '.md',
              );
            }
          } catch {}
          return resolvePath(resolveDirname(resolvePath('docs2', path)), subPath + '.md');
        }),
      );
      const metaEndIndex = lines.slice(1).indexOf('---') + 1;
      lines = lines.filter((line) => !line.startsWith('@page '));
      if (lines.slice(metaEndIndex + 1).filter(Boolean).length === 0) {
        removeFile = true;
        try {
          await fs.rm(resolvePath('docs2', path));
        } catch {}
      }
    }
    content = lines.join('\n');
    content = content.replace(/⚠️/g, ':warning:');
    if (!removeFile) {
      await fs.writeFile(`docs2/${path}`, content);
    }
  }),
);

await Promise.all(
  Object.entries(tabs).map(async ([mainFile, subFiles]) => {
    let mainContent = '';

    try {
      mainContent = await fs.readFile(mainFile, 'utf-8');
    } catch {
      return;
    }
    const subContents = await Promise.all(
      subFiles.map(async (path) => {
        try {
          return await fs.readFile(path, 'utf-8');
        } catch {
          return '';
        }
      }),
    );
    const mainTitle = mainContent.split('\ntitle: ')[1]?.split('\n')[0];
    const subTitles = subContents.map((content) => content.split('\ntitle: ')[1]?.split('\n')[0]);
    const mainId = mainFile?.split('/').pop()?.split('.')[0];
    const subIds = subFiles.map((content) => content?.split('/').pop()?.split('.')[0]);
    const tabsList: string[] = [];
    if (mainTitle) {
      tabsList.push(`${mainTitle}('${mainId}')`);
    }
    subTitles.forEach((title, index) => {
      if (title) tabsList.push(`${title}('${subIds[index]}')`);
    });
    const tabsStr = tabsList.join(', ');

    if (mainContent && !mainContent.includes('tabs: ')) {
      mainContent = mainContent.replace('\n---\n', `\ntabs: ${tabsStr}\n---\n`);
      await fs.writeFile(mainFile, mainContent);
    }
    for (let i = 0; i < subFiles.length; i++) {
      if (subContents[i] && !subContents[i].includes('tabs: ')) {
        const content = subContents[i].replace('\n---\n', `\ntabs: ${tabsStr}\n---\n`);
        await fs.writeFile(subFiles[i], content);
      }
    }
  }),
);
