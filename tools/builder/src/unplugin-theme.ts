import * as fs from 'node:fs/promises';

import { loadSemcoreSources, resolveSemcoreSources } from '@semcore/esbuild-plugin-semcore';
import { createUnplugin } from 'unplugin';

export const unpluginThemeResolve = createUnplugin<{ rootPath: string }>((opts) => ({
  name: 'theme-resolve',

  async resolveId(id) {
    if (!id.includes('@semcore/theme')) return null;
    return await resolveSemcoreSources(id, opts.rootPath);
  },
  loadInclude: (id) => {
    return id.includes('/semcore/');
  },
  async load(id) {
    const { code, dependencies } = await loadSemcoreSources(id);

    for (const dep of dependencies) {
      this.addWatchFile(dep);
    }

    return {
      code,
    };
  },
  enforce: 'pre',
  vite: {
    handleHotUpdate({ server, modules, file }) {
      if (modules.some((module) => module.file?.includes('/tools/theme'))) {
        fs.readFile(file.replace('.js', '.css'), 'utf-8').then((css) => {
          server.ws.send({
            type: 'custom',
            event: 'css-variables-update',
            data: {
              file,
              css,
            },
          });
        });

        return [];
      }
    },
  },
}));
