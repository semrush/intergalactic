import { loadSemcoreSources, resolveSemcoreSources } from '@semcore/esbuild-plugin-semcore';
import { createUnplugin } from 'unplugin';

export const unpluginSemcoreResolve = createUnplugin<{}>(() => ({
  name: 'semcore-resolve',
  async resolveId(id) {
    if (
      !id.includes('@semcore') &&
      !id.includes('/semcore/') &&
      !id.startsWith('intergalactic/')
    )
      return null;
    if (id.endsWith('.md')) return null;
    return await resolveSemcoreSources(id);
  },
  loadInclude: (id) => {
    return id.includes('/semcore/');
  },
  async load(id) {
    return await loadSemcoreSources(id);
  },
  enforce: 'pre',
}));
