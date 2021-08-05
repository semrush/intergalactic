module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-import'),
    require('postcss-css-variables')({ preserve: false }),
    require('postcss-custom-media'),
    require('autoprefixer'),
    require('cssnano'),
    require('postcss-color-mod-function'),
  ],
};
