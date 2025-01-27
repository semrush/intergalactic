import { Plugin } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { resolve as resolvePath, dirname as resolveDirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import glob from 'fast-glob';
import { createUnplugin } from 'unplugin';

const __dirname = resolveDirname(fileURLToPath(import.meta.url));

const srcDir = resolvePath(__dirname, '../../../src');
const staticDir = resolvePath(srcDir, './static/');

export const unpluginStatic = createUnplugin(() => ({
  name: 'unplugin-static',
  async resolveId(id) {
    if (id === '@static') return id;
  },
  async load(id) {
    if (id !== '@static') return null;
    const relativePaths = await glob('**/*', { cwd: staticDir });
    const imports = relativePaths.map(
      (path, index) => `import static_${index} from "${resolvePath(staticDir, path)}"`,
    );
    const exports = relativePaths.map((path, index) => `["${path}"]: static_${index}`);

    const contents =
      imports.join('\n') +
      '\nconst importsMap = {' +
      exports.join(',\n') +
      '};\nexport default importsMap;';

    return contents;
  },
}));
