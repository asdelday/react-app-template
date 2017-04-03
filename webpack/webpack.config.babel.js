/**
 * webpack.config.js
 *
 * process.env.NODE_ENV is used to determine to return production config or not
 * (an array with both browser and server config)
 *
 * if not, env is used to determine to return browser-rendering config
 * (for hot module replacement) or server-side rendering config (for node)
 *
 * env is a string passed by "webpack --env" on command line or calling this function directly
 * if env contains substring 'browser', then returns browser-rendering config,
 * otherwise server-rendering config
 *
 * NOTE: browser/server is client/server-side rendering respectively
 * in universal/isomorphic javascript
 */
import path from 'path';
import PATHS from '../config/paths';
import rules from './rules';
import plugins from './plugins';
import { externalModules } from './externals';
import resolve from './resolve';

/**
 * Create the webpack configuration and returns it
 * @param {string} [env=''] environment (browser | server | test)
 * @returns {[*,*]|Object} returns webpack configuration
 */
export default (env = '') => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isBrowser = (env.indexOf('browser') >= 0);
  console.log(`Running webpack in ${process.env.NODE_ENV} mode on ${isBrowser ? 'browser' : 'server'}`); // eslint-disable-line no-console

  const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  const node = { __dirname: true, __filename: true };

  // PRODUCTION - SERVER
  const prodServerRender = {
    devtool: 'source-map',
    context: PATHS.app,
    entry: { server: path.join(PATHS.server, 'index.js') },
    target: 'node',
    node,
    externals: externalModules,
    output: {
      path: PATHS.compiled,
      filename: '[name].js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2',
    },
    module: { rules: rules({ production: true, browser: false }) },
    resolve,
    plugins: plugins({ production: true, browser: false }),
  };

  // PRODUCTION - BROWSER
  const prodBrowserRender = {
    devtool: 'cheap-module-source-map',
    context: PATHS.app,
    entry: { app: [path.join(PATHS.app, 'client.jsx')] },
    node,
    output: {
      path: PATHS.assets,
      filename: '[name].[hash:6].js',
      chunkFilename: '[name].[chunkhash:6].js',
      publicPath: PATHS.public,
    },
    module: { rules: rules({ production: true, browser: true }) },
    resolve,
    plugins: plugins({ production: true, browser: true }),
  };

  // DEVELOPMENT - BROWSER
  const devBrowserRender = {
    devtool: 'eval',
    context: PATHS.app,
    entry: { app: [hotMiddlewareScript, path.join(PATHS.app, 'client.jsx')] },
    node,
    output: {
      path: PATHS.assets,
      filename: '[name].[hash:6].js',
      chunkFilename: '[name].[chunkhash:6].js',
      publicPath: PATHS.public,
    },
    module: { rules: rules({ production: false, browser: true }) },
    resolve,
    plugins: plugins({ production: false, browser: true }),
  };

  // DEVELOPMENT - SERVER
  const devServerRender = {
    devtool: 'sourcemap',
    context: PATHS.app,
    entry: { server: path.join(PATHS.server, 'index.js') },
    target: 'node',
    node,
    externals: externalModules,
    output: {
      path: PATHS.compiled,
      filename: '[name].dev.js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2',
    },
    module: { rules: rules({ production: false, browser: false }) },
    resolve,
    plugins: plugins({ production: false, browser: false }),
  };

  const prodConfig = [prodBrowserRender, prodServerRender];
  const devConfig = isBrowser ? devBrowserRender : devServerRender;

  return isProduction ? prodConfig : devConfig;
};
