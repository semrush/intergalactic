import { dirname, resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

import { unpluginSemcoreResolve } from '@semcore/builder/plugins';
import copy from 'rollup-plugin-copy';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';

const rootDir = resolvePath(dirname(fileURLToPath(import.meta.url)));

export default defineConfig({
  plugins: [
    unpluginSemcoreResolve.vite({ rootPath: rootDir }),
  ],
  esbuild: {
    legalComments: 'inline',
  },
  build: {
    minify: false,
    emptyOutDir: false,
    outDir: 'lib',
    rollupOptions: {
      treeshake: false,
      external: ['react', 'react-dom', 'react/jsx-runtime', /@babel\/runtime\/*/, /@semcore\/*/],
      output: [
        {
          preserveModules: true,
          assetFileNames: 'esm/[name][extname]',
          entryFileNames: 'esm/[name].mjs',
          format: 'esm',
        },
      ],
      plugins: [
        // @ts-ignore
        copy({
          targets: [
            { src: 'src/**/*.shadow.css', dest: 'lib/esm' },
          ],
          flatten: false,
        }),
      ],
    },
  },
}) as UserConfig;
