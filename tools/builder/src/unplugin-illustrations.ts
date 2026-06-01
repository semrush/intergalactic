import { resolve as resolvePath } from 'path';

import glob from 'fast-glob';
import { createUnplugin } from 'unplugin';

export const unpluginIllustrations = createUnplugin<{ rootPath: string }>((opts) => ({
  name: 'unplugin-illustrations',
  async resolveId(id) {
    if (id === '@illustrations') return id;
  },
  async load(id) {
    if (id !== '@illustrations') return null;
    const illustrationsDir = resolvePath(opts.rootPath, 'semcore', 'illustration');
    const fullPath = resolvePath(illustrationsDir);
    const illustrationPaths = await glob('lib/*/index.mjs', {
      cwd: fullPath,
    });
    const illustrationNames = illustrationPaths
      .filter((path) => !path.includes('esm') && !path.includes('cjs') && !path.includes('es6'))
      .map((path) => {
        const parts = path.split('/');
        return parts[parts.length - 2];
      });

    const imports = illustrationNames.map(
      (name, index) =>
        `import illustration_${index} from "@semcore/illustration/${name}"`,
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
