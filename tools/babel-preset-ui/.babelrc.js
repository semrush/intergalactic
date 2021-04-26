module.exports = function(babel, opts = {}) {
  return {
    presets: [
      '@babel/preset-typescript',
      ['@babel/preset-env', { modules: false, ...opts.env }],
      '@babel/preset-react',
    ],
    plugins: [
      '@semcore/babel-plugin-root',
      '@semcore/babel-plugin-styles',
      ['@semcore/babel-plugin-shadow', opts.shadow],
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-class-properties',
      'babel-plugin-preval',
      '@babel/plugin-transform-runtime',
      [
        'babel-plugin-recharts',
        {
          replacePattern: ['lib', 'es6'],
          ...opts.recharts,
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
          [
            'babel-plugin-recharts',
            {
              replacePattern: ['es6', 'lib'],
            },
          ],
        ],
      },
    },
  };
};
