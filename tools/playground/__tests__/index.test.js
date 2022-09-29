import { resolve as resolvePath } from 'path';
import glob from 'fast-glob';
import esbuild from 'esbuild';
/* eslint-disable import/no-unresolved */
// @ts-ignore
import { esbuildPluginSemcoreSourcesResolve } from 'disable-jest-mapper:@semcore/esbuild-plugin-semcore/esbuild-plugin-semcore-sources-resolve';
/* eslint-enable import/no-unresolved */

describe('Playground sources resolving', () => {
  test('resolve documentation, playground and local examples', async () => {
    const docsDir = resolvePath(__dirname, '../../../website/docs');
    const playgroundsDir = resolvePath(__dirname, '../examples');
    const examplesDir = resolvePath(__dirname, './examples');

    const realSetImmediate = global.setImmediate;
    global.setImmediate = (func) => new Promise(() => func());

    const docs = await glob('**/*.(j|t)s(x)?', { cwd: docsDir });
    const playgrounds = await glob('**/*.(j|t)s(x)?', { cwd: playgroundsDir });
    const examples = await glob('**/*.(j|t)s(x)?', { cwd: examplesDir });

    global.setImmediate = realSetImmediate;

    await esbuild.build({
      entryPoints: [
        ...docs.map((path) => resolvePath(docsDir, path)),
        ...playgrounds.map((path) => resolvePath(playgroundsDir, path)),
        ...examples.map((path) => resolvePath(examplesDir, path)),
      ],
      bundle: true,
      plugins: [esbuildPluginSemcoreSourcesResolve(resolvePath(__dirname, '../../..'))],
      loader: {
        '.svg': 'file',
        '.md': 'file',
      },
      external: [
        'react',
        'react-dom',
        'react-virtualized',
        'components',
        'tags',
        'static',
        'algolia',
        '!!raw-loader!@semcore',
        '!css-variables-loader!@semcore',
        '@components/PlaygroundGeneration',
        '@navigation',
        '@static',
        '@components/Color',
        '@components/Copy',
        '@components/algolia-config',
        '@icons/lib',
        '@icons',
        '@illustrations',
      ],
      outdir: './output-is-disabled-with-write-false-option',
      write: false,
    });
  }, 30000);
});
