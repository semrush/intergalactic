module.exports = function (babel, opts = {}) {
  return {
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            esmodules: true,
            // browsers: [
            //   'last 0.5 year',
            //   'last 2 safari versions',
            //   'last 2 iOS versions',
            // ],
          },
          shippedProposals: true,
          ...opts.env,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@semcore/babel-plugin-root',
      '@semcore/babel-plugin-styles',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-class-properties',
      'babel-plugin-preval',
      [
        '@babel/plugin-transform-runtime',
        {
          // https://github.com/babel/babel/issues/10261
          version: require('@babel/helpers/package.json').version,
        },
      ],
      [
        '@semcore/babel-plugin-recharts',
        {
          replacePattern: ['lib', 'es6'],
          ...opts.recharts,
        },
      ],
    ],
    env: {
      commonjs: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                // esmodules: true,
                browsers: ['last 0.5 year', 'last 2 safari versions', 'last 2 iOS versions'],
              },
              shippedProposals: true,
              ...opts.env,
            },
          ],
        ],
        plugins: [
          [
            '@babel/plugin-transform-modules-commonjs',
            {
              loose: false,
            },
          ],
          [
            '@semcore/babel-plugin-recharts',
            {
              replacePattern: ['es6', 'lib'],
            },
          ],
        ],
      },
    },
  };
};
