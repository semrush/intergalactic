import { Loader, Plugin } from 'esbuild';
import babel from '@babel/core';
import { readFile } from 'fs/promises';
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

const supportedExtensions = ['ts', 'js', 'tsx', 'jsx', 'css'];
const loaderOfExtension: { [key: string]: Loader } = { md: 'text' };

const cacheManager = makeCacheManager('esbuild_plugin_semcore');
await cacheManager.init();

if (process.argv.includes('--reset-cache')) {
  await cacheManager.reset();
}

export const esbuildPluginSemcore = (filter: RegExp, excludeFilter?: RegExp): Plugin => ({
  name: 'esbuild-plugin-semcore',
  setup(build) {
    build.onLoad({ filter }, async ({ path, namespace }) => {
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
