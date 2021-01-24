'use strict';
const os = require('os');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const loaderUtils = require('loader-utils');
const findCacheDir = require('find-cache-dir');
const VirtualModulesPlugin = require('webpack-virtual-modules');
const utils = require('@reshadow/utils');

const virtualModules = new VirtualModulesPlugin();
let cacheDirectory;
let options;

const makeLoader = (loader) =>
  function(...args) {
    // Make the loader async
    const callback = this.async();
    loader.apply(this, args).then((args) => callback(null, ...args), (err) => callback(err));
  };

async function loader(source, inputSourceMap) {
  if (this.cacheable) this.cacheable();
  options =
    options ||
    Object.assign(
      {
        getFilepath: (filepath, code) => {
          const hash = `${utils.getFileHash(filepath)}_${utils.getFileHash(code)}`;
          const filename = `${hash}.css`;
          return path.resolve(cacheDirectory, filename);
        },
        virtualFS: true,
      },
      loaderUtils.getOptions(this),
    );
  cacheDirectory =
    cacheDirectory ||
    options.cacheDirectory ||
    findCacheDir({
      name: 'reshadow',
    }) ||
    os.tmpdir();
  let writeModule;

  if (options.virtualFS) {
    const { compiler } = this._compilation;
    /**
     * We need to tap 'after-environment' hook by hands,
     * because there is no 'official' register for the plugin
     */

    compiler.hooks.afterEnvironment.intercept({
      name: 'VirtualModulesPlugin',
      context: true,
      register: (tap) => (tap.fn(), tap),
    });
    virtualModules.apply(compiler);

    writeModule = (filepath, content) => {
      virtualModules.writeModule(filepath, content);
    };
  } else {
    writeModule = (filepath, content) => {
      return new Promise((resolve) => {
        mkdirp(path.dirname(filepath), {}, () => {
          fs.writeFile(filepath, content, resolve);
        });
      });
    };
  }

  const { resourcePath } = this;
  const queue = [];
  const result = source
    .replace(
      // Regexp below should match on the CSS code from strings like that:
      //
      // /*__reshadow_css_start__*/
      // __css__(
      //   /*__inner_css_start__*/
      //   `button {
      //     /* Some CSS rules here... */
      //     content: "*"; /* With some quotes maybe */
      //   }`
      //   /*__inner_css_end__*/
      // , "2845693891")
      // /*__reshadow_css_end__*/
      //
      // We're using comment blocks to find the end of the code to extract.
      /\/\*__reshadow_css_start__\*\/([\s\S]*?)\/\*__reshadow_css_end__\*\//g,
      (match, codeBlock) => {
        let [, code] = codeBlock.match(/__inner_css_start__\*\/([\s\S]*?)\/\*__inner_css_end__/);
        // also remove ',' in the end of line
        code = code
          .trim()
          .replace(/,$/, '')
          .replace(/^[`'"]([\s\S]*?)[`'"]$/, '$1');
        const filepath = options.getFilepath(resourcePath, code);
        queue.push(
          writeModule(
            filepath,
            code
              .replace(/\\"/g, '"')
              .replace(/\\'/g, "'")
              .replace(/\\n/g, '\n'),
          ),
        );
        const [requirePath] = filepath.split('node_modules/').slice(-1);
        return `require('${requirePath}')`;
      },
    )
    .replace(/\/\*__reshadow-styles__:"(.*?)"\*\//g, (match, dep) => {
      const depPath = utils.resolveDependency({
        filename: dep,
        basedir: path.dirname(resourcePath),
      });
      this.dependency(depPath);
      return '';
    });
  await Promise.all(queue);
  // sourcemap breaks the out code. That's why it's disabled :(
  return [result /* , inputSourceMap */];
}

module.exports = makeLoader(loader);
