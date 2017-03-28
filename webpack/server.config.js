const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');

const externalModules = fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((acc, cur) => Object.assign(acc, { [cur]: 'commonjs ' + cur }), {});

process.env.BABEL_ENV = 'production';

module.exports = {
  devtool: 'source-map',
  context: config.paths.root,
  entry: path.join(config.paths.src, 'server.jsx'),
  target: 'node',
  node: { __dirname: true, __filename: true },
  externals: externalModules,
  output: {
    path: path.join(config.paths.root, 'compiled'),
    filename: '[name].js',
    publicPath: '/dist/',
    libraryTarget: 'commonjs2',
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
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: true,
    }),

    new webpack.EnvironmentPlugin(['NODE_ENV']),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // Extract CSS
    new ExtractTextPlugin({ filename: `${config.filename}.css` }),

    config.webpackIsomorphicToolsPlugin,
  ],
};
