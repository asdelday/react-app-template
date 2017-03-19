const path = require('path');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const ROOT_PATH = path.resolve(__dirname, '..');

module.exports = {
  // Development server configuration
  host: process.env.HOST || 'localhost',
  port: Number(process.env.PORT) || 8080,

  // Generic configuration
  title: 'Air Shop',
  paths: {
    root: ROOT_PATH,
    dist: path.join(ROOT_PATH, 'static', 'dist'),
    src: path.join(ROOT_PATH, 'src'),
  },
  filename: '[name]-[hash]',
  chunkFilename: '[name]-[chunkhash]',
  library: 'ReactAppTemplate',
  libraryTarget: 'umd',

  // Include here all the libraries which must be outside the production bundle
  externals: {},

  // Webpack Isomorphic Tools Plugin
  webpackIsomorphicToolsPlugin,
};
