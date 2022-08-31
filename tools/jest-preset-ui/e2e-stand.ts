import esbuild from 'esbuild';
import { esbuildPluginSemcore } from '@semcore/esbuild-plugin-semcore';
import { esbuildPluginSemcoreSourcesResolve } from '@semcore/esbuild-plugin-semcore/esbuild-plugin-semcore-sources-resolve';
import { dirname as resolveDirname, resolve as resolvePath } from 'path';

const resolveFilename = (path: string) => path.split('/').pop();

export const e2eStandToHtml = async (standFilePath: string, locale: string) => {
  const standBundle = await esbuild.build({
    entryPoints: ['@test-entrypoint'],
    plugins: [
      {
        name: 'test-entrypint',
        setup(build) {
          build.onResolve({ filter: /^@test-entrypoint$/ }, ({ path }) => ({
            path,
            namespace: 'test-entrypoint',
          }));
          build.onLoad({ filter: /^@test-entrypoint$/, namespace: 'test-entrypoint' }, () => {
            const contents = `
              import React from 'react';
              import ReactDOM from 'react-dom';
              import App from './${resolveFilename(standFilePath)}';
              import { I18nProvider } from '@semcore/utils/lib/enhances/WithI18n';

              ReactDOM.render(
                <I18nProvider value='${locale}'>
                  <App />
                </I18nProvider>,
                document.querySelector('#root')
              );
            `;

            return { contents, loader: 'tsx', resolveDir: resolveDirname(standFilePath) };
          });
        },
      },
      esbuildPluginSemcoreSourcesResolve(resolvePath(__dirname, '../..')),
      esbuildPluginSemcore(/semcore|tools/, /(tools\/playground)|node_modules/),
    ],
    bundle: true,
    write: false,
    outdir: 'dev/null',
  });

  const cssFiles = standBundle.outputFiles
    .filter((file) => file.path.endsWith('.css'))
    .map((file) => file.text);
  const jsFiles = standBundle.outputFiles
    .filter((file) => file.path.endsWith('.js'))
    .map((file) => file.text);

  return `
      <!DOCTYPE html>
      <html lang="${locale}">
        <head>
          <style>${cssFiles.join('\n')}</style>
        </head>
        <body>
          <div id="root"></div>
          <script>${jsFiles.join('\n')}</script>
        </body>
      </html>
    `;
};
