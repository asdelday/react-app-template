const path = require('path');

/*
 * __dirname is changed after webpack-ed to another directory
 * so process.cwd() is used instead to determine the correct base directory
 * Read more: https://nodejs.org/api/process.html#process_process_cwd
 */
const CURRENT_WORKING_DIR = process.cwd();

export default {
  app: path.resolve(CURRENT_WORKING_DIR, 'app'),
  server: path.resolve(CURRENT_WORKING_DIR, 'server'),
  static: 'static',
  assets: path.resolve(CURRENT_WORKING_DIR, 'static', 'dist'),
  compiled: path.resolve(CURRENT_WORKING_DIR, 'compiled'),
  public: '/dist/', // use absolute path for css-loader?
  modules: path.resolve(CURRENT_WORKING_DIR, 'node_modules'),
};
