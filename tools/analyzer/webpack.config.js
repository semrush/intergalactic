const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function () {
  return {
    entry: path.join(__dirname, 'index.js'),
    output: {
      filename: 'build.js',
      path: path.resolve(),
    },
    watch: true,
    mode: 'production',
    resolve: {
      alias: {
        '@semcore': path.join(__dirname, '../../semcore'),
      },
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
    },
    plugins: [new BundleAnalyzerPlugin()],
    performance: { hints: false },
  };
};
