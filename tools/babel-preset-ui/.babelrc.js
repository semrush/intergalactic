module.exports = function (babel, opts = {}) {
  return {
    presets: [
      '@babel/preset-typescript',
      ['@babel/preset-env', { modules: false, ...opts.env }],
      ['@babel/preset-react', { throwIfNamespace: false }],
    ],
    plugins: [
      ['@semcore/babel-plugin-root', opts.root],
      '@semcore/babel-plugin-styles',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-import-assertions',
      'babel-plugin-preval',
      [
        '@babel/plugin-transform-runtime',
        {
          version: require('@babel/runtime/package.json').version,
          useESModules: opts.isEsm,
        },
      ],
    ],
    env: {
      commonjs: {
        presets: [['@babel/preset-env', opts.env]],
        plugins: [
          [
            '@babel/plugin-transform-modules-commonjs',
            {
              loose: false,
            },
          ],
        ],
      },
    },
  };
};
