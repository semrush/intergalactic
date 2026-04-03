import { resolve as resolvePath, dirname as resolveDirname } from 'path';
import { fileURLToPath } from 'url';

import type { Plugin } from 'esbuild';
import glob from 'fast-glob';

type IconPaths = Record<string, {
  folder?: string;
  size: {
    m: string;
    l: string;
  };
}>;

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
        ignore: ['esm', 'src', 'node_modules', 'cjs', 'es6'],
      });

      const handledSizes = ['m', 'l'];

      const iconPaths = allIcons.reduce<IconPaths>((acc, path) => {
        const splitPath = path.split('/');

        const iconFile = splitPath[splitPath.length - 1];
        const iconSize = splitPath[splitPath.length - 2];
        const iconName = splitPath[splitPath.length - 3];
        const iconFolder = splitPath[splitPath.length - 4];

        if (!handledSizes.includes(iconSize)) return acc;

        const iconConfig = acc[iconName];

        acc[iconName] = {
          folder: iconFolder,
          size: {
            ...iconConfig?.size,
            [iconSize]: iconFile,
          },
        };

        return acc;
      }, {});

      const imports: Array<string> = [];
      const exports: Array<string> = [];

      Object.entries(iconPaths).forEach(([iconName, { folder, size: sizes }]) => {
        const iconExports: Array<string> = [];

        Object.keys(sizes).forEach((size) => {
          const importName = `${iconName}${size.toUpperCase()}`;
          const importFrom = folder ? `${folder}/${iconName}/${size}` : `${iconName}/${size}`;
          const importPath = `import ${importName} from '@semcore/icon/${importFrom}'`;

          iconExports.push(`['${size}']: ${importName}`);
          imports.push(importPath);
        });

        exports.push(`['${iconName}']: { ${iconExports.join(',\n')} }`);
      });

      const contents =
        imports.join('\n') +
        '\nconst importsMap = {' +
        exports.join(',\n') +
        '};\nexport default importsMap;';

      return { contents, loader: 'js', resolveDir: fullPath };
    });
  },
});
