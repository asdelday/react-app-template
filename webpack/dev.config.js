const path = require('path');
const webpack = require('webpack');
const config = require('./config');

const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

process.env.BABEL_ENV = 'development';

module.exports = {
  devtool: 'inline-source-map',
  context: config.paths.root,
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(config.paths.src, 'client.jsx'),
  ],
  output: {
    path: config.paths.dist,
    filename: `${config.filename}.js`,
    chunkFilename: `${config.chunkFilename}.js`,
    publicPath: `http://${host}:${port}/dist/`,
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel', 'eslint'] },
      { test: /\.scss$/, exclude: [/components.scss/], loader: 'style!css?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]!postcss' },
      { test: /\.scss$/, include: [/components.scss/], loader: 'style!css!postcss' },
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
  externals: config.externals,
  progress: true,
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.json', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true, // <-------- DISABLE redux-devtools HERE
    }),

    config.webpackIsomorphicToolsPlugin.development(),
  ],
};
