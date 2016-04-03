require('babel/polyfill');
require('webpack-isomorphic-tools');

// Webpack config for development
const path = require('path');
const webpack = require('webpack');
const assetsPath = path.resolve(__dirname, '../../app/static/dist');
const config = require('../../app/src/config');
const baseUrl = `http://${config.webpack.host}:${config.webpack.port}`;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('../../app/src/www/webpack-isomorphic-tools')
);

const babelLoaderQuery = require('./babel.parse.js');

module.exports = {
  devtool: 'eval',
  context: path.resolve(__dirname, '../..'),
  host: config.webpack.host,
  port: config.webpack.port,
  entry: {
    main: [
      `webpack-hot-middleware/client?path=${baseUrl}/__webpack_hmr`,
      'bootstrap-loader',
      'font-awesome-webpack!./app/src/www/theme/font-awesome.config.js',
      './app/src/www/client.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `${baseUrl}/dist/`,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          `babel?${JSON.stringify(babelLoaderQuery)}`,
          'eslint-loader',
        ],
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.less$/,
        loader: [
          'style',
          'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
          'autoprefixer?browsers=last 2 version',
          'less?outputStyle=expanded&sourceMap',
        ].join('!'),
      }, {
        test: /\.scss$/,
        loader: [
          'style',
          'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
          'autoprefixer?browsers=last 2 version',
          'sass?outputStyle=expanded&sourceMap',
          'sass-resources',
        ].join('!'),
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml' },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240' },
    ],
  },
  sassResources: [
    './app/src/www/theme/variables.scss',
    './app/src/www/theme/mixins.scss',
  ],
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', '.json', '.js', '.jsx'],
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin(Object.assign(
      require('../../app/src/globals'),
      {
        __CLIENT__: true,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true,  // <-------- DISABLE redux-devtools HERE
      }
    )),
    webpackIsomorphicToolsPlugin.development(),
  ],
};
