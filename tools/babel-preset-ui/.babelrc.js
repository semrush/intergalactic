const babelrc = require('@semcore/cli/tools/babel-preset-ui');

module.exports = function (babel, opts = {}) {
  const { presets, plugins, env } = babelrc(babel, opts);
  env.commonjs.plugins = [
    ...env.commonjs.plugins,
    ['@semcore/babel-plugin-recharts', { replacePattern: ['es6', 'lib'] }],
  ];
  return {
    env,
    presets,
    plugins: [
      ...plugins,
      [
        '@semcore/babel-plugin-recharts',
        {
          replacePattern: ['lib', 'es6'],
          ...opts.recharts,
        },
      ],
    ],
  };
};
