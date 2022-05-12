import { Plugin } from 'esbuild';
import { readFile } from 'fs/promises';
import {
  resolve as resolvePath,
  dirname as resolveDirname,
  relative as resolveRelativePath,
} from 'path';
import { fileURLToPath } from 'url';
import { serializeNavigation } from './navigation';
import { bundleArticle, getRepoTyping } from './build-article/build-article';

const __dirname = resolveDirname(fileURLToPath(import.meta.url));
const docsDir = resolvePath(__dirname, '../docs');
const docComponentsDir = resolvePath(__dirname, '../src/docs-components');

export const esbuildPluginDocs = (): Plugin => ({
  name: 'esbuild-plugin-docs',
  setup(build) {
    build.onResolve({ filter: /^@docs$/ }, async ({ path }) => ({ path, namespace: 'docs' }));
    build.onLoad({ filter: /^@docs$/, namespace: 'docs' }, async ({ path }) => {
      const fullPath = resolvePath(__dirname, 'docs', path.substring('@docs/'.length));
      const contents = await readFile(fullPath, 'utf-8');

      return { contents, loader: 'text' };
    });

    build.onResolve({ filter: /^@navigation$/ }, async ({ path }) => ({ path, namespace: 'nav' }));
    build.onLoad({ filter: /^@navigation$/, namespace: 'nav' }, async () => {
      const contents = await serializeNavigation(docsDir);

      return { contents, loader: 'js', resolveDir: docsDir };
    });

    build.onResolve({ filter: /^@docs\/.*\.md$/ }, async ({ path }) => {
      const purePath = resolvePath(docsDir, path.substring('@docs/'.length));

      return { path: purePath };
    });
    build.onLoad({ filter: /.*\.md$/ }, async ({ path }) => {
      const relativePath = resolveRelativePath(docsDir, path);
      const contents = await bundleArticle(docsDir, relativePath);
      const resolveDir = resolveDirname(resolvePath(docsDir, relativePath));

      return { contents, loader: 'js', resolveDir };
    });

    build.onResolve({ filter: /^@typing\/.*/ }, async ({ path }) => ({ path, namespace: 'types' }));
    build.onLoad({ filter: /^@typing\/.*/, namespace: 'types' }, async ({ path }) => {
      const typeName = path.substring('@typing/'.length);
      const { declaration, dependencies } = await getRepoTyping(typeName, path);

      let stringified = JSON.stringify({ declaration, dependencies });
      stringified = stringified.replace(/"~~~%%%/g, '() => import("');
      stringified = stringified.replace(/%%%~~~"/g, '")');

      const contents = `const typing=${stringified}; export default typing;`;

      return { contents, loader: 'js', resolveDir: docsDir };
    });

    build.onResolve({ filter: /@components\// }, ({ path }) => {
      const purePath = path.substring('@components/'.length);
      const resolvedPath = resolvePath(docComponentsDir, purePath) + '.jsx';

      return { path: resolvedPath, namespace: 'file' };
    });
  },
});
