import glob from 'fast-glob';
import fs from 'fs/promises';
import { resolve as resolvePath, dirname as resolveDirname } from 'path';

const markdowns = await glob('**/*.md', { cwd: 'docs' });
await Promise.all(
  markdowns.map(async (path) => {
    let content = await fs.readFile(`docs/${path}`, 'utf-8');
    content = content.replace(/\n@#/g, '\n#');
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('> 🚨 ')) {
        lines[i] = lines[i].replace('> 🚨 ', ':rotating_light: ');
        lines.splice(i + 1, 0, ':::');
        if (lines[i + 2] !== '') lines.splice(i + 1, 0, '');

        lines.splice(i, 0, '::: warning');
      }
      if (path.endsWith('button-code.md')) {
        if (lines[i].startsWith('@example ')) {
          const exampleName = lines[i].split(' ')[1];
          const examplePath = resolvePath(
            'docs',
            resolveDirname(path),
            'examples',
            `${exampleName}.tsx`,
          );
          let exampleCode = await fs.readFile(examplePath, 'utf-8');
          if (exampleCode.endsWith('\n')) {
            exampleCode = exampleCode.substring(0, exampleCode.length - 1);
          }
          const newLines = [
            '::: my-sandbox {entry=/App.tsx, template=vite-react-ts}',
            '',
            '```tsx /App.tsx [active]',
            ...exampleCode.split('\n'),
            '```',
            '',
            ':::',
          ];
          lines.splice(i, 1, ...newLines);
          try {
            await fs.rm(
              resolvePath('docs2', resolveDirname(path), 'examples', `${exampleName}.tsx`),
            );
          } catch {}
        }
      }
    }
    content = lines.join('\n');
    await fs.writeFile(`docs2/${path}`, content);
  }),
);
