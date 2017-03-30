import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as ENV from '../config/env';

/**
 * Retrieve Webpack plugins due to the configuration passed
 * @param {boolean} production - flag which indicates if is a production env
 * @param {boolean} browser - flag which indicates if is a browser platform
 * @returns {Array.<*>} returns the array with the plugins
 */
export default ({ production = false, browser = false } = {}) => {
  const processEnv = Object.keys(ENV).reduce((result, envKey) => {
    const _result = result;
    _result[envKey] = JSON.stringify(ENV[envKey]);

    return _result;
  }, {}) || {};

  const definitions = {
    'process.env': processEnv,
    __CLIENT__: !!browser,
    __SERVER__: !browser,
    __DEVELOPMENT__: !production,
    __DEVTOOLS__: true,
  };

  const plugins = [
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
    return plugins.concat([new webpack.optimize.UglifyJsPlugin({ sourceMap: true })]);
  }

  // PRODUCTION AND BROWSER
  if (production && browser) {
    return plugins.concat([
      new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    ]);
  }

  // DEFAULT
  return plugins.concat([]);
};
