import { resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

import { esbuildPluginSemcore } from '@semcore/esbuild-plugin-semcore';
import { esbuildPluginSemcoreSourcesResolve } from '@semcore/esbuild-plugin-semcore/esbuild-plugin-semcore-sources-resolve';
import esbuild from 'esbuild';
import picocolros from 'picocolors';

import { esbuildPluginPlaygroundsLoader } from './esbuild-plugin-playgrounds-loader';

const port = 2077;

esbuild
  .serve(
    {
      servedir: './public',
      port,
    },
    {
      entryPoints: ['src/index.tsx'],
      bundle: true,
      sourcemap: true,
      outdir: './public/dist',
      publicPath: '/dist',
      plugins: [
        esbuildPluginPlaygroundsLoader('./examples'),
        esbuildPluginSemcoreSourcesResolve(resolvePath(fileURLToPath(import.meta.url), '../../..')),
        esbuildPluginSemcore(/semcore|tools/, /(tools\/playground)|node_modules/),
      ],
      loader: {
        '.svg': 'file',
      },
    },
  )
  .then(() => {
    console.log('\nStarted on ' + picocolros.yellow(`http://localhost:${port}\n`));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
