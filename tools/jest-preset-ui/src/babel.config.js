const { createTransformer } = require('babel-jest');

module.exports = createTransformer({
  presets: [
    [
      '@semcore/babel-preset-ui',
      {
        env: {
          modules: 'commonjs'
        },
        root: {
          coverage: true
        },
        cssStyle: {
          extract: null,
        },
      },
    ],
  ],
  plugins: ['babel-plugin-transform-import-meta'],
});
