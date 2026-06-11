import os from 'os';
import { resolve as resolvePath } from 'path';

import { semcoreSourceEsbuildPlugin } from '@semcore/esbuild-plugin-semcore';
import light from '@semcore/theme/light';
import esbuild from 'esbuild';

export const e2eStandToHtml = async (
  standFilePath: string,
  locale: string,
  props?: Record<string, unknown>,
) => {
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
            const propsCode = Object.entries(props || {})
              .map(([key, value]) => {
                if (typeof value === 'string' && value.trim().startsWith('function')) {
                  return `${key}: ${value}`;
                }
                return `${key}: ${JSON.stringify(value)}`;
              })
              .join(',\n');

            const contents = `
              import React from 'react';
              import ReactDOM from 'react-dom';
              import App from './${standFilePath}';
              import { I18nProvider } from '@semcore/core/lib/utils/enhances/WithI18n';

              const props = { ${propsCode} };
              // legacy synchronous rendering for more stable visual tests
              ReactDOM.render(
                <I18nProvider value='${locale}'>
                  <App {...props} />
                </I18nProvider>,
                document.querySelector('#root')
              );
            `;

            return {
              contents,
              loader: 'tsx',
              resolveDir: process.cwd(),
            };
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
      semcoreSourceEsbuildPlugin(resolvePath(__dirname, '..', '..')),
    ],
    bundle: true,
    write: false,
    outdir: os.devNull,
    logLevel: 'debug',
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
        <style>
          :root {
            ${Object.entries(light).map(([key, value]) => `${key}: ${value};`).join('\n')}
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>${jsFiles.join('\n')}</script>
      </body>
    </html>
  `;

  return htmlContent;
};
