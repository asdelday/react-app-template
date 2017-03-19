const webpack = require('webpack');

process.env.BABEL_ENV = 'test';

module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      // JSX - Files - ESLINT
      { test: /\.jsx?$/, exclude: /node_modules/, enforce: 'pre', loader: 'eslint-loader' },
      // JSX? - Files - BABEL
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },

      // SCSS - Files - [STYLE-CSS-POSTCSS]
      { test: /\.scss$/, include: /components.scss/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        exclude: /components.scss/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]',
          'postcss-loader',
        ],
      },
      { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url-loader?limit=10240' },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.json', '.js', '.jsx'],
  },
  externals: {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  plugins: [
    new webpack.IgnorePlugin(/\.json$/),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true, // <-------- DISABLE redux-devtools HERE
    }),
  ],
};
