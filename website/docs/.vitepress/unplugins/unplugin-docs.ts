import type { Plugin } from 'esbuild';
import { readFile } from 'node:fs/promises';
import {
  resolve as resolvePath,
  dirname as resolveDirname,
  relative as resolveRelativePath,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { serializeNavigation } from './navigation';
import { bundleArticle, getRepoTyping } from './build-article/build-article';
import { createUnplugin } from 'unplugin';

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

    build.onResolve({ filter: /@components\// }, ({ path }) => {
      const purePath = path.substring('@components/'.length);
      const resolvedPath = `${resolvePath(docComponentsDir, purePath)}.jsx`;

      return { path: resolvedPath, namespace: 'file' };
    });
  },
});

// export const unpluginDocs = createUnplugin(() => ({
//   name: 'unplugin-docs',
//   async resolveId(id) {
//     if (id === '@docs') return id;
//   },
//   async load(id) {
//     if (id !== '@docs') return null;

//     // build.onLoad({ filter: /.*\.md$/ }, async ({ path }) => {
//     //   const relativePath = resolveRelativePath(docsDir, path);
//     //   const contents = await bundleArticle(docsDir, relativePath);
//     //   const resolveDir = resolveDirname(resolvePath(docsDir, relativePath));

//     //   return { contents, loader: 'js', resolveDir };
//     // });

//   })
// });
