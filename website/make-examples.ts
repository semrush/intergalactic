import fs from 'fs/promises';
import { resolve as resolvePath } from 'path';

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

async function parseItem(path: string, item: string) {
  try {
    const files = await fs.readdir(resolvePath(path, item));

    await Promise.all(
      files.map(async (file) => {
        const info = await fs.stat(resolvePath(path, item, file));

        if (info.isFile() && file.endsWith('-code.md')) {
          const doc = await fs.readFile(resolvePath(path, item, file), 'utf8');

          const tokens = doc.split('\n');
          const code: Record<string, { code: string; indexes: number[] }> = {};

          for (let i = 0; i < tokens.length; i++) {
            if (tokens[i]?.startsWith('##')) {
              const indexes: number[] = [];
              const name = tokens[i].replace(/##/, '').trim().replace(/\s/g, '_').toLowerCase();

              while (!tokens[i]?.startsWith('<script') && i < tokens.length) {
                i++;
              }

              indexes.push(i);

              let scriptData = '';

              while (tokens[i] !== ':::' && i < tokens.length) {
                scriptData += tokens[i] ? tokens[i] + '\n' : '\n';
                i++;
                indexes.push(i);
              }

              code[name] = {
                code: clearScriptTagFromTags(scriptData),
                indexes,
              };
            }
          }

          try {
            await fs.mkdir(resolvePath(path, item, 'examples'));
          } catch (e) {
            console.warn(e);
          }

          await Promise.all(
            Object.entries(code).map(async ([name, data]) => {
              await fs.writeFile(
                resolvePath(path, item, 'examples', `${name}.tsx`),
                data.code,
                'utf8',
              );

              data.indexes.forEach((item, index) => {
                if (index === 0) {
                  tokens[item] = tokens[item]?.replace(
                    '>',
                    ` src="examples/${name}.tsx"></script>\n\n:::`,
                  );
                } else {
                  tokens[item] = null;
                }
              });
            }),
          );

          const resultMd = tokens.filter((token) => token !== null).join('\n');

          await fs.writeFile(resolvePath(path, item, file), resultMd, 'utf8');
        }
      }),
    );
  } catch (e) {
    console.warn(e);
  }
}

async function parse(path: string) {
  const data = await fs.readdir(path);

  for (const item of data) {
    await parseItem(path, item);
  }
}

parse('docs2/components');
