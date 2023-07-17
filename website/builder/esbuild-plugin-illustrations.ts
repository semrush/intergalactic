import { Plugin } from 'esbuild';
import { resolve as resolvePath, dirname as resolveDirname } from 'path';
import { fileURLToPath } from 'url';
import glob from 'fast-glob';

const __dirname = resolveDirname(fileURLToPath(import.meta.url));

const illustrationsDir = resolvePath(__dirname, '../../semcore/illustration');

export const esbuildPluginIllustrations = (): Plugin => ({
  name: 'esbuild-plugin-illustrations',
  setup(build) {
    build.onResolve({ filter: /^@illustrations$/ }, async ({ path }) => ({
      path,
      namespace: 'illustrations',
    }));
    build.onLoad({ filter: /^@illustrations/, namespace: 'illustrations' }, async () => {
      const fullPath = resolvePath(illustrationsDir);
      const allIllustrations = await glob('**/index.mjs', {
        cwd: fullPath,
        ignore: ['lib', 'src', 'node_modules', 'cjs', 'es6'],
      });
      const illustrationNames = allIllustrations.map((path) => {
        const parts = path.split('/');
        return parts[parts.length - 2];
      });

      const imports = allIllustrations.map(
        (path, index) => `import illustration_${index} from "./${path}"`,
      );
      const exports = illustrationNames.map((path, index) => `["${path}"]: illustration_${index}`);
      const contents =
        imports.join('\n') +
        '\nconst importsMap = {' +
        exports.join(',\n') +
        '};\nexport default importsMap;';

      return { contents, loader: 'js', resolveDir: fullPath };
    });
  },
});
