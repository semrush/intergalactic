const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function () {
  return {
    entry: path.join(__dirname, 'App.js'),
    devtool: 'source-map',
    output: {
      filename: 'build.js',
      path: path.resolve(process.cwd(), '.tmp/playground'),
    },
    mode: 'development',
    // mode: 'production',
    // optimization: {
    //   minimize: false
    // },
    devServer: {
      static: './.tmp/playground',
      port: 8080,
    },
    resolveLoader: {
      alias: {
        'examples-loader': path.join(__dirname, 'examplesLoader'),
      },
    },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
      modules: ['node_modules', '../../node_modules'],
      alias: {
        examples: path.join(__dirname, 'index.js'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|jsx|tsx)$/i,
          exclude: /(node_modules)/,
          // enforce: 'pre',
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['@semcore/babel-preset-ui'],
            },
          },
        },
        // {
        //   test: /\.(js|ts|jsx|tsx)$/i,
        //   exclude: /(node_modules)/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       babelrc: false,
        //       plugins: [['@semcore/babel-plugin-react-semcore', {
        //         theme: [process.cwd()],
        //         scope: 'semcore'
        //       }]],
        //     },
        //   },
        // },
        {
          test: /\.(js|ts|jsx|tsx)$/i,
          use: {
            loader: '@semcore/shadow-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, '../../node_modules/.cache'),
            },
          },
        },
        {
          test: /\.css$/,
          include: /\/node_modules\/\.cache\//,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(svg)$/i,
          use: {
            loader: 'file-loader',
          },
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: './favicon.ico',
      }),
      new webpack.NormalModuleReplacementPlugin(/^@semcore/, function (resource) {
        try {
          const resolvePath = require.resolve(resource.request, {
            paths: [resource.context],
          });
          if (resolvePath.includes('/node_modules/')) return;
        } catch (e) {
          // console.log(e);
        }
        if (resource.request.includes('/lib/') && !resource.request.includes('/icon/')) {
          resource.request = resource.request.replace('/lib/', '/src/');
        } else if (!resource.request.includes('/icon/') && !resource.request.includes('/src/')) {
          resource.request = `${resource.request}/src`;
        }
      }),
    ],
  };
};
