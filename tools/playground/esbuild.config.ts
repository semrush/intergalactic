import esbuild from 'esbuild';
import { esbuildPluginSemcore } from '@semcore/esbuild-plugin-semcore';
import { esbuildPluginSemcoreSourcesResolve } from '@semcore/esbuild-plugin-semcore/esbuild-plugin-semcore-sources-resolve';
import { esbuildPluginPlaygroundsLoader } from './esbuild-plugin-playgrounds-loader';
import picocolros from 'picocolors';
import { fileURLToPath } from 'node:url';
import { resolve as resolvePath } from 'node:path';

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
    // biome-ignore lint/suspicious/noConsoleLog:
    console.log('\nStarted on ' + picocolros.yellow(`http://localhost:${port}\n`));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
