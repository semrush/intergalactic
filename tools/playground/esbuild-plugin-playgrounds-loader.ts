import { Plugin } from 'esbuild';
import { readdir } from 'fs/promises';

export const esbuildPluginPlaygroundsLoader = (playgroundsDir: string): Plugin => ({
  name: 'esbuild-plugin-playgrounds-loader',
  setup(build) {
    build.onResolve({ filter: /@playgrounds/ }, async ({ path }) => ({
      path,
      namespace: 'playgrounds',
    }));
    build.onLoad({ filter: /@playgrounds/ }, async () => {
      const playgroundNames = await readdir(playgroundsDir);
      const playgroundExportFileContent =
        playgroundNames
          .map((name, index) => `import playground_${index} from "./${name}";`)
          .join('\n') +
        '\nexport const playgrounds = {\n' +
        playgroundNames.map((name, index) => `["${name}"]: playground_${index} `).join(',\n') +
        '\n}';

      return {
        contents: playgroundExportFileContent,
        resolveDir: playgroundsDir,
        loader: 'tsx',
      };
    });
  },
});
