import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

import { themeToFigmaTokens } from './figma-processor.ts';
import { theme } from '../src/theme.ts';

const writeIfChanged = async (filePath: string, content: string) => {
  try {
    const originalContent = await readFile(filePath, 'utf-8');
    if (originalContent.replace(/[\s\n]/g, '') === content.replace(/[\s\n]/g, '')) {
      return false;
    }
  } catch (err: unknown) {
    if (!(err instanceof Error) || !('code' in err) || err.code !== 'ENOENT') {
      throw err;
    }
  }
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, content);
  return true;
};

const figmaDirname = resolvePath(fileURLToPath(import.meta.url), '..');
const allowlistPath = resolvePath(figmaDirname, 'rebranding-light.tokens.json');
const outputPath = resolvePath(figmaDirname, 'figma-light.tokens.json');

const figmaTokens = themeToFigmaTokens(theme, allowlistPath);

const changed = await writeIfChanged(outputPath, `${JSON.stringify(figmaTokens, null, 2)}\n`);

console.log(changed ? `Synced Figma tokens to ${outputPath}` : `Figma tokens already up to date: ${outputPath}`);
