import { Plugin } from 'esbuild';
import { resolve as resolvePath, dirname as resolveDirname } from 'path';
import { fileURLToPath } from 'url';
import glob from 'fast-glob';

const __dirname = resolveDirname(fileURLToPath(import.meta.url));

const iconsDir = resolvePath(__dirname, '../../semcore/icon');

export const esbuildPluginIcons = (): Plugin => ({
  name: 'esbuild-plugin-icons',
  setup(build) {
    build.onResolve({ filter: /^@icons$/ }, async ({ path }) => ({
      path,
      namespace: 'icons',
    }));
    build.onResolve({ filter: /^@icons\/lib$/ }, async ({ path }) => ({
      path,
      namespace: 'icons',
    }));
    build.onLoad({ filter: /^@icons/, namespace: 'icons' }, async ({ path }) => {
      const fullPath = path.endsWith('/lib') ? resolvePath(iconsDir, 'lib') : resolvePath(iconsDir);
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
        } else {
          return parts[parts.length - 3];
        }
      });

      const imports = iconPaths.map((path, index) => `import icon_${index} from "./${path}"`);
      const exports = iconNames.map((path, index) => `["${path}"]: icon_${index}`);
      const contents =
        imports.join('\n') +
        '\nconst importsMap = {' +
        exports.join(',\n') +
        '};\nexport default importsMap;';

      return { contents, loader: 'js', resolveDir: fullPath };
    });
  },
});
