module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-import'),
    require('postcss-css-variables')({ preserve: false }),
    require('autoprefixer'),
    require('cssnano'),
  ],
};
