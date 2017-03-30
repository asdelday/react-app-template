import fs from 'fs';

/**
 * Exclude node modules in Webpack
 *
 * Webpack allows you to define externals - modules that should not be bundled.
 *
 * When bundling with Webpack for the backend - you usually don't want to bundle its node_modules
 * dependencies. This library creates an externals function that
 * ignores node_modules when bundling in Webpack.
 */
const externalModules = fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((acc, cur) => Object.assign(acc, { [cur]: `commonjs ${cur}` }), {});

export default externalModules;
