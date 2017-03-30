import PATHS from '../config/paths';

/**
 * Configure how modules are resolved.
 */
export default {
  modules: [PATHS.app, PATHS.modules],
  extensions: ['.json', '.js', '.jsx', '.css'],
};
