import { readFile, access } from 'fs/promises';
import { platform } from 'node:process';
import { dirname as resolveDirname, join as joinPaths, resolve as resolvePath } from 'path';

import type { Loader, Plugin } from 'esbuild';

import { makeCacheManager } from './cache-manager';
import { extractSemcoreImplicitDependencies } from './semcore-implicit-dependncies-resolver';
export { esbuildPluginSemcoreSourcesResolve } from './esbuild-plugin-semcore-sources-resolve';

const babelTransform = async (contents: string, path: string) => {
  // @ts-ignore
  const { default: babelConfig } = await import('@semcore/babel-preset-ui/.babelrc.js');
  const babel = await import('@babel/core');

  const code = await new Promise((resolve, reject) =>
    babel.transform(
      contents,
      {
        filename: platform === 'win32' ? path.replaceAll('/', '\\') : path,
        cwd: resolveDirname(platform === 'win32' ? resolveDirname(joinPaths(process.cwd(), 'intergalactic')) : path),
        ...babelConfig(),
      },
      (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result?.code);
      },
    ),
  );
  return code as string;
};

const supportedExtensions = ['ts', 'js', 'tsx', 'jsx'];
const loaderOfExtension: { [key: string]: Loader } = { md: 'text', mjs: 'js' };
const prioritizedExtensionFallback: { [key: string]: string } = { js: 'mjs' };

const cacheManager = makeCacheManager('esbuild_plugin_semcore');

export const esbuildPluginSemcore = (filter: RegExp, excludeFilter?: RegExp): Plugin => ({
  name: 'esbuild-plugin-semcore',
  async setup(build) {
    await cacheManager.init();

    if (process.argv.includes('--reset-cache')) {
      await cacheManager.reset();
    }

    build.onLoad({ filter }, async ({ path, namespace }) => {
      {
        const extension = path.split('.').pop()! as Loader;
        if (prioritizedExtensionFallback[extension]) {
          const fallbackPath = `${path.split('.').slice(0, -1).join('.')}.${
            prioritizedExtensionFallback[extension]
          }`;
          try {
            await access(fallbackPath);
            path = fallbackPath;
          } catch {
            /* no file in fallback location */
          }
        }
      }

      const sourceContents = await readFile(resolvePath(...path.split('/')), 'utf-8');
      const extension = path.split('.').pop()! as Loader;
      const loader = loaderOfExtension[extension] || extension;

      if (namespace === 'rawFile') {
        return {
          contents: sourceContents,
          loader: 'text',
        };
      }

      if (excludeFilter?.test(path) || !supportedExtensions.includes(extension)) {
        return {
          contents: sourceContents,
          loader,
        };
      }

      const cache = await cacheManager.hasInCache(path);

      if (cache) {
        return {
          contents: cache,
          loader,
        };
      }

      const contents = await babelTransform(sourceContents, path);
      const implicitDependencies = await extractSemcoreImplicitDependencies(
        contents,
        path,
        build.resolve,
      );

      await cacheManager.addToCache(path, contents, implicitDependencies);

      return {
        contents,
        loader,
        watchFiles: implicitDependencies,
      };
    });
  },
});
