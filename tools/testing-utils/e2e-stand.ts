import esbuild from 'esbuild';
import os from 'os';
import {
  esbuildPluginSemcore,
  esbuildPluginSemcoreSourcesResolve,
} from '@semcore/esbuild-plugin-semcore';
import { dirname as resolveDirname, resolve as resolvePath } from 'path';

export const e2eStandToHtml = async (standFilePath: string, locale: string) => {
  const standBundle = await esbuild.build({
    entryPoints: ['@test-entrypoint'],
    plugins: [
      {
        name: 'test-entrypoint',
        setup(build) {
          build.onResolve({ filter: /^@test-entrypoint$/ }, ({ path }) => ({
            path,
            namespace: 'test-entrypoint',
          }));
          build.onLoad({ filter: /^@test-entrypoint$/, namespace: 'test-entrypoint' }, () => {
            const contents = `
              import React from 'react';
              import ReactDOM from 'react-dom';
              import App from '${resolvePath(standFilePath)}';
              import { I18nProvider } from '@semcore/core/lib/utils/enhances/WithI18n';

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
      {
        name: 'persistent-react',
        setup(build) {
          build.onResolve({ filter: /^react$/ }, () => ({
            path: require.resolve('react'),
            namespace: 'file',
          }));
          build.onResolve({ filter: /^react-dom$/ }, () => ({
            path: require.resolve('react-dom'),
            namespace: 'file',
          }));
        },
      },
      esbuildPluginSemcoreSourcesResolve(resolvePath(__dirname, '../..')),
      esbuildPluginSemcore(/semcore|tools|stories/, /(tools\/playground)|node_modules/),
    ],
    bundle: true,
    write: false,
    outdir: os.devNull,
  });

  const cssFiles = standBundle.outputFiles
    .filter((file) => file.path.endsWith('.css'))
    .map((file) => file.text);
  const jsFiles = standBundle.outputFiles
    .filter((file) => file.path.endsWith('.js'))
    .map((file) => file.text);

  const htmlContent = `
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

  return htmlContent;
};
