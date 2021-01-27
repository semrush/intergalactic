const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const config = {
    mode: argv.mode || 'development',
    devtool: false,
    stats: 'minimal',
    entry: './client',
    output: {
      path: path.join(__dirname, 'client/dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          loader: 'babel-loader',
          exclude: /\/node_modules\/|\/semcore\//,
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@semcore/babel-plugin-shadow',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-optional-chaining',
            ],
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(svg|png|jpg|ico|gif|woff2)$/i,
          use: {
            loader: 'file-loader',
          },
        },
        {
          test: /\.md$/i,
          use: {
            loader: 'raw-loader',
          },
        },
      ],
    },
    resolve: {
      modules: [path.join(__dirname, 'client'), 'node_modules', '../node_modules'],
      alias: {
        '@docs': path.join(__dirname, './docs'),
        release: path.join(__dirname, '../release'),
        react: path.join(__dirname, './node_modules/react'),
        'react-dom': path.join(__dirname, './node_modules/react-dom'),
      },
    },
    plugins: [
      new CopyPlugin([
        {
          from: path.join(__dirname, './docs'),
          to: path.join(__dirname, './client/dist'),
          ignore: ['*.js', '*.md'],
        },
        {
          from: path.join(__dirname, './client/web'),
          to: path.join(__dirname, './client/dist'),
        },
      ]),
    ],
  };

  if (argv.mode !== 'production') {
    config.plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }));
  }
  return config;
};
