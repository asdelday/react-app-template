const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Retrieve Webpack plugins due to the configuration passed
 * @param {boolean} production - flag which indicates if is a production env
 * @param {boolean} browser - flag which indicates if is a browser platform
 * @returns {Array.<*>} returns the array with the plugins
 */
module.exports = ({ production = false, browser = false } = {}) => {
  const definitions = {
    'process.env': { NODE_ENV: JSON.stringify(production ? 'production' : 'development') },
    __CLIENT__: !!browser,
    __SERVER__: !browser,
    __DEVELOPMENT__: !production,
    __DEVTOOLS__: true,
  };

  const  plugins = [
    new webpack.DefinePlugin(definitions),
  ];

  // DEVELOPMENT AND SERVER
  if (!production && !browser) {
    return plugins.concat([]);
  }

  // DEVELOPMENT AND BROWSER
  if (!production && browser) {
    return plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoEmitOnErrorsPlugin(),
    ]);
  }

  // PRODUCTION AND SERVER
  if (production && !browser) {
    return plugins.concat([
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    ]);
  }

  // PRODUCTION AND BROWSER
  if (production && browser) {
    return plugins.concat([
      new ExtractTextPlugin({ filename: 'styles/main.css', allChunks: true }),
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    ]);
  }

  // DEFAULT
  return plugins.concat([]);
};
