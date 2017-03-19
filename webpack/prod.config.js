const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');

process.env.BABEL_ENV = 'production';

module.exports = {
  devtool: 'source-map',
  context: config.paths.root,
  entry: path.join(config.paths.src, 'client.jsx'),
  output: {
    path: config.paths.dist,
    filename: `${config.filename}.js`,
    chunkFilename: `${config.chunkFilename}.js`,
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.scss$/, exclude: [/components.scss/], loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]!postcss') },
      { test: /\.scss$/, include: [/components.scss/], loader: ExtractTextPlugin.extract('style', 'css!postcss') },
      { test: /\.css$/, loader: 'style!css!postcss' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: config.webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url?limit=10240' },
    ],
  },
  postcss: config.postcss,
  progress: true,
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.json', '.js', '.jsx'],
  },
  plugins: [
    new CleanPlugin([config.paths.dist], { root: config.paths.root }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // Extract CSS
    new ExtractTextPlugin(`${config.chunkFilename}.css`, { allChunks: true }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),

    config.webpackIsomorphicToolsPlugin,
  ],
};
