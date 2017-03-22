const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./dev.config');
const config = require('../src/config');

const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

const devServerSettings = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  lazy: false,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  // Combine with existing server
  // publicPath: webpackConfig.output.publicPath,

  // Console Output options
  quiet: false,
  noInfo: false,
  stats: {
    assets: true,
    colors: true,
    version: false,
    hash: false,
    timings: true,
    chunks: true,
    chunkModules: false,
    errorDetails: true,
  },
};

const devServer = new WebpackDevServer(webpack(webpackConfig), devServerSettings);

devServer.listen(port, host, (err) => {
  /* eslint-disable max-len, no-console */
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
  /* eslint-enable max-len, no-console */
});
