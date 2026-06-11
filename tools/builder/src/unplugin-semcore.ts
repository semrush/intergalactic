import { loadSemcoreSources, resolveSemcoreSources } from '@semcore/esbuild-plugin-semcore';
import { createUnplugin } from 'unplugin';

export const unpluginSemcoreResolve = createUnplugin<{ rootPath: string }>((opts) => ({
  name: 'semcore-resolve',

  async resolveId(id) {
    if (!id.includes('@semcore') || id.includes('@semcore/theme')) return null;
    if (id.endsWith('.md')) return null;
    return await resolveSemcoreSources(id, opts.rootPath);
  },
  loadInclude: (id) => {
    return id.includes('/semcore/');
  },
  async load(id) {
    const { code } = await loadSemcoreSources(id);

    return {
      code,
    };
  },
  enforce: 'pre',
}));
