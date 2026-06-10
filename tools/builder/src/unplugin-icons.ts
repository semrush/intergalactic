import { resolve as resolvePath } from 'path';

import glob from 'fast-glob';
import { createUnplugin } from 'unplugin';

type IconPaths = Record<string, {
  folder?: string;
  size: {
    m: string;
    l: string;
  };
}>;

export const unpluginIcons = createUnplugin<{ rootPath: string }>((opts) => ({
  name: 'unplugin-icons',
  async resolveId(id) {
    if (id === '@icons') return id;
  },
  async load(id) {
    if (id !== '@icons') return null;
    const iconsDir = resolvePath(opts.rootPath, 'semcore', 'icon');
    const fullPath = id.endsWith('/lib') ? resolvePath(iconsDir, 'lib') : resolvePath(iconsDir);
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

    return contents;
  },
}));
