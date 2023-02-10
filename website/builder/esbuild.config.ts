// @ts-ignore
import { esbuildPluginSemcore } from '../../tools/esbuild-plugin-semcore/src/esbuild-plugin-semcore';
// @ts-ignore
import { esbuildPluginSemcoreSourcesResolve } from '../../tools/esbuild-plugin-semcore/src/esbuild-plugin-semcore-sources-resolve';
import esbuild from 'esbuild';
import esbuildPluginAlias from 'esbuild-plugin-alias';
import { resolve as resolvePath } from 'path';
import { esbuildPluginDocs } from './esbuild-plugin-docs';
import { esbuildPluginStatic } from './esbuild-plugin-static';
import { esbuildPluginIcons } from './esbuild-plugin-icons';
import { esbuildPluginIllustrations } from './esbuild-plugin-illustrations';
import { esbuildPluginCssModules } from './esbuild-plugin-css-modules';
import { esbuildPluginCrutches } from './esbuild-intergalactic-crutches';
import { fileURLToPath } from 'url';

export const websiteEsbuildConfig: esbuild.BuildOptions = {
  entryPoints: ['./src/main-render.jsx'],
  bundle: true,
  sourcemap: true,
  publicPath: process.env.PUBLIC_PATH || '/',
  format: 'esm',
  splitting: true,
  treeShaking: true,
  plugins: [
    esbuildPluginSemcoreSourcesResolve(resolvePath(fileURLToPath(import.meta.url), '../../..')),
    esbuildPluginSemcore(/semcore|tools/),
    esbuildPluginDocs(),
    esbuildPluginStatic(),
    esbuildPluginIcons(),
    esbuildPluginIllustrations(),
    esbuildPluginCrutches(),
    esbuildPluginCssModules(),
    process.env.NODE_ENV !== 'production'
      ? esbuildPluginAlias({
          react: resolvePath('./node_modules/react/index.js'),
          'react-dom': resolvePath('./node_modules/react-dom/index.js'),
        })
      : esbuildPluginAlias({
          react: resolvePath('./node_modules/react/umd/react.production.min.js'),
          'react-dom': resolvePath('./node_modules/react-dom/umd/react-dom.production.min.js'),
        }),
  ],
  define: {
    'process.env.PUBLIC_PATH': JSON.stringify(process.env.PUBLIC_PATH || '/'),
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.AMPLITUDE_API_KEY': JSON.stringify(process.env.AMPLITUDE_API_KEY),
  },
  loader: {
    ['.woff2']: 'file',
    ['.ttf']: 'file',
    ['.svg']: 'file',
    ['.png']: 'file',
  },
};
