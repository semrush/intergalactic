const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const withTM = require('next-transpile-modules')(['@semcore/d3-chart']);

// module.exports = withTM({
module.exports = {
  webpack: (config, {}) => {
    config.module.rules.push({
      test: /\.jsx?$/,
      include: /@semcore\//,
      enforce: 'pre',
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            plugins: ['@semcore/babel-plugin-react-semcore'],
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.+(js|jsx|mjs|ts|tsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
          plugins: [],
        },
      },
    });
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/(@semcore|\.cache\/reshadow)/,
      use: '@semcore/shadow-loader',
    });
    config.module.rules.push({
      test: /\.css$/,
      include: /node_modules\/(@semcore|\.cache\/reshadow)/,
      use: [MiniCssExtractPlugin.loader, { loader: 'css-loader' }],
    });
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'static/[name].css',
        chunkFilename: 'static/[contenthash].css',
      }),
    );
    // Important: return the modified config
    return config;
  },
  // experimental: {
  //   esmExternals: false,
  // },
};
