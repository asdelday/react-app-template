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
    rules: [
      // JSX? - Files - BABEL
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },

      // SCSS - Files - [STYLE-CSS-POSTCSS]
      {
        test: /\.scss$/,
        include: /components.scss/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.scss$/,
        exclude: /components.scss/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1&minimize&sourceMap&localIdentName=[name]__[local]',
            'postcss-loader',
          ],
        }),
      },

      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: config.webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.json', '.js', '.jsx'],
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
    new ExtractTextPlugin({ filename: `${config.filename}.css` }),

    // optimizations
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),

    config.webpackIsomorphicToolsPlugin,
  ],
};
