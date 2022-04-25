import esbuild from 'esbuild';
import { esbuildPluginSemcore } from './esbuild-plugin-semcore';
import { esbuildPluginSemcoreSourcesResolve } from './esbuild-plugin-semcore-sources-resolve';
import { esbuildPluginPlaygroundsLoader } from './esbuild-plugin-playgrounds-loader';

/* eslint-disable no-console */

const port = 8080;

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
      publicPath: 'dist',
      plugins: [
        esbuildPluginPlaygroundsLoader('./examples'),
        esbuildPluginSemcoreSourcesResolve(),
        esbuildPluginSemcore(/semcore|tools/, /(tools\/playground)|node_modules/),
      ],
      loader: {
        '.svg': 'file',
      },
    },
  )
  .then(() => {
    console.log(`\nStarted on http://localhost:${port}\n`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
