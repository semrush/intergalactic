import { Plugin } from 'esbuild';
import { resolve as resolvePath, dirname as resolveDirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import glob from 'fast-glob';
import { createUnplugin } from 'unplugin';

const __dirname = resolveDirname(fileURLToPath(import.meta.url));

const iconsDir = resolvePath(__dirname, '../../../../semcore/icon');

export const unpluginIcons = createUnplugin(() => ({
  name: 'unplugin-icons',
  async resolveId(id) {
    if (id === '@icons') return id;
  },
  async load(id) {
    if (id !== '@icons') return null;
    const fullPath = id.endsWith('/lib') ? resolvePath(iconsDir, 'lib') : resolvePath(iconsDir);
    const allIcons = await glob('**/index.mjs', {
      cwd: fullPath,
      ignore: ['lib', 'src', 'node_modules', 'cjs', 'es6'],
    });
    const iconPaths = allIcons.filter((path) => {
      const maybeSize = path.split('/')[path.split('/').length - 2];
      return !['xxl', 'xl', 'l', 's', 'xs', 'xxs'].includes(maybeSize);
    });
    const iconNames = iconPaths.map((path) => {
      const parts = path.split('/');
      if (!['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'].includes(parts[parts.length - 2])) {
        return parts[parts.length - 2];
      }
      return parts[parts.length - 3];
    });

    const imports = iconPaths.map(
      (path, index) => `import icon_${index} from "@semcore/icon/${path.replace(/^\.\//, '')}"`,
    );
    const exports = iconNames.map((name, index) => `["${name}"]: icon_${index}`);
    const contents =
      imports.join('\n') +
      '\nconst importsMap = {' +
      exports.join(',\n') +
      '};\nexport default importsMap;';

    return contents;
  },
}));
