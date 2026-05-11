import { loadSemcoreSources, resolveSemcoreSources } from '@semcore/esbuild-plugin-semcore';
import { createUnplugin } from 'unplugin';

import { makeCacheManager } from './cache-manager.ts';

const cacheManager = makeCacheManager('esbuild_plugin_semcore-resolver');

export const unpluginSemcoreResolve = createUnplugin<{ rootPath: string }>((opts) => ({
  name: 'semcore-resolve',
  async buildStart() {
    await cacheManager.init();

    if (process.argv.includes('--reset-cache')) {
      await cacheManager.reset();
    }
  },
  async resolveId(id) {
    if (
      (
        !id.includes('@semcore') &&
        !id.includes('/semcore/')
      ) ||
      id.includes('@semcore/theme')
    )
      return null;
    if (id.endsWith('.md')) return null;
    return await resolveSemcoreSources(id, opts.rootPath);
  },
  loadInclude: (id) => {
    return id.includes('/semcore/');
  },
  async load(id) {
    const cache = await cacheManager.hasInCache(id);

    if (cache) {
      return {
        code: cache,
      };
    }

    const { code } = await loadSemcoreSources(id);

    await cacheManager.addToCache(id, code);

    return {
      code,
    };
  },
  enforce: 'pre',
}));
