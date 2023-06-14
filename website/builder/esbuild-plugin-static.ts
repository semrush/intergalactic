import { Plugin } from 'esbuild';
import { readFile } from 'fs/promises';
import { resolve as resolvePath, dirname as resolveDirname } from 'path';
import { fileURLToPath } from 'url';
import glob from 'fast-glob';

const __dirname = resolveDirname(fileURLToPath(import.meta.url));

const srcDir = resolvePath(__dirname, '../src');
const staticDir = resolvePath(srcDir, './static');
export const esbuildPluginStatic = (): Plugin => ({
  name: 'esbuild-plugin-static',
  setup(build) {
    build.onResolve({ filter: /^@static$/ }, async ({ path }) => ({
      path,
      namespace: 'static-map',
    }));
    build.onLoad({ filter: /^@static$/, namespace: 'static-map' }, async ({ task }) => {
      const relativePaths = await glob('**/*', { cwd: staticDir });
      const imports = relativePaths.map(
        (path, index) => `import static_${index} from "static/${path}"`,
      );
      const exports = relativePaths.map((path, index) => `["${path}"]: static_${index}`);

      const contents =
        imports.join('\n') +
        '\nconst importsMap = {' +
        exports.join(',\n') +
        '};\nexport default importsMap;';

      return { contents, loader: 'js', resolveDir: staticDir };
    });

    build.onLoad({ filter: new RegExp(staticDir) }, async ({ path }) => {
      const contents = await readFile(path, 'utf-8');
      return { contents, loader: 'file' };
    });
  },
});
