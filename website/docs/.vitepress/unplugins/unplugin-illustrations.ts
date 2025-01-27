import { Plugin } from 'esbuild';
import { resolve as resolvePath, dirname as resolveDirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import glob from 'fast-glob';
import { createUnplugin } from 'unplugin';

const __dirname = resolveDirname(fileURLToPath(import.meta.url));

const illustrationsDir = resolvePath(__dirname, '../../../../semcore/illustration');

export const unpluginIllustrations = createUnplugin(() => ({
  name: 'unplugin-illustrations',
  async resolveId(id) {
    if (id === '@illustrations') return id;
  },
  async load(id) {
    if (id !== '@illustrations') return null;
    const fullPath = resolvePath(illustrationsDir);
    const illustrationPaths = await glob('**/index.mjs', {
      cwd: fullPath,
      ignore: ['lib', 'src', 'node_modules', 'cjs', 'es6'],
    });
    const illustrationNames = illustrationPaths.map((path) => {
      const parts = path.split('/');
      return parts[parts.length - 2];
    });

    const imports = illustrationPaths.map(
      (path, index) =>
        `import illustration_${index} from "@semcore/illustration/${path.replace(/^\.\//, '')}"`,
    );
    const exports = illustrationNames.map((name, index) => `["${name}"]: illustration_${index}`);
    const contents =
      imports.join('\n') +
      '\nconst importsMap = {' +
      exports.join(',\n') +
      '};\nexport default importsMap;';

    return contents;
  },
}));
