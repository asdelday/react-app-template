const webpack = require('webpack');
const config = require('./config');

process.env.BABEL_ENV = 'test';

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.scss$/, exclude: [/components.scss/], loader: 'style!css?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]!postcss' },
      { test: /\.scss$/, include: [/components.scss/], loader: 'style!css!postcss' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', query: { limit: 10240 } },
    ],
  },
  postcss: config.postcss,
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.json', '.js', '.jsx'],
  },
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  plugins: [
    new webpack.IgnorePlugin(/\.json$/),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true, // <-------- DISABLE redux-devtools HERE
    }),
  ],
};
