// Forked from https://gitlab.com/hesxenon/esbuild-plugin-simple-css-modules

import type * as Esbuild from 'esbuild';
import * as Path from 'path';
import * as PostCss from 'postcss';
import { readFile } from 'fs/promises';
import { createHash } from 'crypto';

export const esbuildPluginCssModules = (): Esbuild.Plugin => ({
  name: 'simple-css-modules',
  async setup(build) {
    const transform = async (path: string) => {
      const content = (await readFile(path)).toString();
      const ast = PostCss.parse(content);
      const styles: Record<string, string> = {};

      const namespace = Path.relative(process.cwd(), path).replace(/\//g, '__').replace(/\./g, '_');
      const namespaceHash = createHash('md5').update(namespace).digest('hex').slice(0, 5);

      ast.walkRules((rule) => {
        const reg = /[.](\w+)/g;
        for (const [, group] of rule.selector.matchAll(reg)) {
          styles[group] = `${group}--${namespaceHash}`;
        }
        rule.selector = rule.selector.replace(reg, `.$1--${namespaceHash}`);
      });

      const css = ast.toResult().css;

      return {
        namespace,
        styles,
        css,
      };
    };

    const cssContents = new Map();

    build.onLoad({ filter: /\.module.css/ }, async (args) => {
      const { css, styles, namespace } = await transform(args.path);

      const importPath = `css-module://${namespace}`;

      cssContents.set(importPath, css);

      return {
        contents: `import "${importPath}";
export default ${JSON.stringify(styles)}
`,
      };
    });

    build.onResolve({ filter: /^css-module:\/\// }, (args) => ({
      path: args.path,
      namespace: 'css-module',
    }));

    build.onLoad({ filter: /.*/, namespace: 'css-module' }, (args) => {
      const css = cssContents.get(args.path);

      return { contents: css, loader: 'css' };
    });
  },
});
