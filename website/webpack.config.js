const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

require('dotenv').config();

module.exports = (_env, argv) => {
  const config = {
    mode: argv.mode || 'development',
    devtool: false,
    stats: 'minimal',
    entry: './client/index.jsx',
    output: {
      path: path.join(__dirname, 'client/dist'),
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
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
              '@semcore/babel-plugin-styles',
              '@semcore/babel-plugin-shadow',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-optional-chaining',
            ],
          },
        },
        {
          test: /\.jsx?$/i,
          include: /semcore\//,
          enforce: 'pre',
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  [
                    '@semcore/babel-plugin-react-semcore',
                    { theme: '@semcore/theme-redesign', scope: 'semcore' },
                  ],
                ],
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(svg|png|jpg|ico|gif|woff2|html)$/i,
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
        release: path.join(__dirname, '../semcore/ui'),
        react: path.join(__dirname, './node_modules/react'),
        'react-dom': path.join(__dirname, './node_modules/react-dom'),
      },
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, './docs'),
            to: path.join(__dirname, './client/dist'),
            globOptions: {
              ignore: ['*.js', '*.md'],
            },
          },
          {
            from: path.join(__dirname, './client/web'),
            to: path.join(__dirname, './client/dist'),
          },
        ],
      }),
    ],
    experiments: {},
  };

  if (argv.mode !== 'production') {
    config.experiments.lazyCompilation = {
      imports: true,
      entries: false,
    };
    config.plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }));
  }
  return config;
};
