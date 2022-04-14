const { createTransformer } = require('babel-jest');

module.exports = createTransformer({
  presets: [
    '@babel/preset-env',
    [
      '@semcore/babel-preset-ui',
      {
        cssStyle: {
          extract: null,
        },
      },
    ],
  ],
  plugins: ['babel-plugin-transform-import-meta'],
});
