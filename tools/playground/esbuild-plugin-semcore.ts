import { Loader, Plugin } from 'esbuild';
import babel from '@babel/core';
import { readFile, access } from 'fs/promises';
import { dirname as resolveDirname } from 'path';
import { makeCacheManager } from './cache-manager';
import { extractSemcoreImplicitDependencies } from './semcore-implicit-dependncies-resolver';

const babelTransform = async (contents: string, path: string) => {
  const { default: babelConfig } = await import('@semcore/babel-preset-ui/.babelrc.js');

  const code = await new Promise((resolve, reject) =>
    babel.transform(
      contents,
      {
        filename: path,
        cwd: resolveDirname(path),
        ...babelConfig(),
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.code!);
      },
    ),
  );
  return code as string;
};

const supportedExtensions = ['ts', 'js', 'tsx', 'jsx'];
const loaderOfExtension: { [key: string]: Loader } = { md: 'text', mjs: 'js' };
const prioritizedExtensionFallback: { [key: string]: string } = { js: 'mjs' };

const cacheManager = makeCacheManager('esbuild_plugin_semcore');
await cacheManager.init();

if (process.argv.includes('--reset-cache')) {
  await cacheManager.reset();
}

export const esbuildPluginSemcore = (filter: RegExp, excludeFilter?: RegExp): Plugin => ({
  name: 'esbuild-plugin-semcore',
  setup(build) {
    build.onLoad({ filter }, async ({ path, namespace }) => {
      {
        const extension = path.split('.').pop()! as Loader;
        if (prioritizedExtensionFallback[extension]) {
          const fallbackPath =
            path.split('.').slice(0, -1).join('.') + '.' + prioritizedExtensionFallback[extension];
          try {
            await access(fallbackPath);
            path = fallbackPath;
          } catch {
            /* no file in fallback location */
          }
        }
      }

      const sourceContents = await readFile(path, 'utf-8');
      const extension = path.split('.').pop()! as Loader;
      const loader = loaderOfExtension[extension] || extension;

      if (namespace === 'rawFile') {
        return {
          contents: sourceContents,
          loader: 'text',
        };
      }

      if ((excludeFilter && excludeFilter.test(path)) || !supportedExtensions.includes(extension)) {
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
