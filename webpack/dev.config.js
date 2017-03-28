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
    rules: [
      // JSX? - Files - ESLINT
      { test: /\.jsx?$/, exclude: /node_modules/, enforce: 'pre', loader: 'eslint-loader' },

      // JSX? - Files - BABEL
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },

      // SCSS - Files - [STYLE-CSS-POSTCSS]
      { test: /\.css$/, include: /components.css/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.css$/,
        exclude: /components.css/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]',
          'postcss-loader',
        ],
      },

      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: config.webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' },
    ],
  },
  externals: config.externals,
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.json', '.js', '.jsx'],
    unsafeCache: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.NamedModulesPlugin(),
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
