import { resolve as resolvePath } from 'path';
import glob from 'fast-glob';
import esbuild from 'esbuild';
import { esbuildPluginSemcoreSourcesResolve } from '../esbuild-plugin-semcore-sources-resolve';

describe('Playground sources resolving', () => {
  test('resolve documentation, playground and local examples', async () => {
    const docsDir = resolvePath(__dirname, '../../../website/docs');
    const playgroundsDir = resolvePath(__dirname, '../examples');
    const examplesDir = resolvePath(__dirname, './examples');

    const realSetImmediate = global.setImmediate;
    (global as any).setImmediate = (func: any) => new Promise(() => func());

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
      plugins: [esbuildPluginSemcoreSourcesResolve()],
      loader: {
        '.svg': 'file',
        '.md': 'file',
      },
      external: [
        'react',
        'react-dom',
        'components',
        'tags',
        'static',
        'algolia',
        '!!raw-loader!@semcore',
        '!css-variables-loader!@semcore',
      ],
      outdir: './output-is-disabled-with-write-false-option',
      write: false,
    });
  }, 20000);
});
