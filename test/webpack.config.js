const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // externals: ['react', 'react-dom'],
  optimization: {
    minimize: false,
  },
  plugins: [
    // new BundleAnalyzerPlugin()
    // new StatoscopeWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.js$/,
        include: /\/semcore\//,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  '@semcore/babel-plugin-react-semcore',
                  {
                    theme: [path.resolve('theme')],
                    scope: 'semcore',
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
};
