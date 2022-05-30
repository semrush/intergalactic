// @ts-ignore
import { esbuildPluginSemcore } from '../../tools/playground/esbuild-plugin-semcore';
// @ts-ignore
import { esbuildPluginSemcoreSourcesResolve } from '../../tools/playground/esbuild-plugin-semcore-sources-resolve';
import esbuild from 'esbuild';
import esbuildPluginAlias from 'esbuild-plugin-alias';
import { resolve as resolvePath } from 'path';
import { esbuildPluginDocs } from './esbuild-plugin-docs';
import { esbuildPluginStatic } from './esbuild-plugin-static';
import cssModulesPlugin from 'esbuild-plugin-css-modules';
import { esbuildPluginIcons } from './esbuild-plugin-icons';

export const websiteEsbuildConfig: esbuild.BuildOptions = {
  entryPoints: ['./src/main-render.jsx', './src/main.css'],
  bundle: true,
  sourcemap: true,
  outdir: './dist',
  // publicPath: process.env.PUBLIC_PATH || '/',
  outbase: 'docs',
  entryNames: '[dir]/[name]',
  assetNames: '[dir]/[name]-[hash]',
  chunkNames: '[dir]/[name]-[hash]',
  format: 'esm',
  splitting: true,
  plugins: [
    cssModulesPlugin({
      localIdentName: '[local]-[hash:8:md5:hex]',
    }),
    esbuildPluginSemcoreSourcesResolve(),
    esbuildPluginSemcore(/semcore|tools/),
    esbuildPluginDocs(),
    esbuildPluginStatic(),
    esbuildPluginIcons(),
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
    'process.env.NODE_EVN': process.env.NODE_EVN,
  },
  loader: {
    ['.woff2']: 'file',
    ['.ttf']: 'file',
    ['.svg']: 'file',
    ['.png']: 'file',
  },
  external: [
    '../WindowScroller.js', // https://github.com/bvaughn/react-virtualized/issues/1632
  ],
};
