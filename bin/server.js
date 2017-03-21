#!/usr/bin/env node

require('../server.babel'); // babel registration (runtime transpilation for node)
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicToolsConfig = require('../webpack/webpack-isomorphic-tools');

const webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig);

global.webpackIsomorphicTools = webpackIsomorphicTools.server(rootDir, () => {
  require('../src/server.jsx');
});
