import express from 'express';
import initExpress from './init/express';
import initRoutes from './init/routes';
import renderMiddleware from './render/middleware';
import { isDevelopment } from '../config';

const app = express();

if (isDevelopment) {
  // enable webpack hot module replacement
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack/webpack.config.babel');

  const devBrowserConfig = webpackConfig('browser') || {};
  const compiler = webpack(devBrowserConfig);
  const publicPath = devBrowserConfig.output && devBrowserConfig.output.publicPath;

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// Bootstrap application settings
initExpress(app);

// REMOVE if you do not need any routes
initRoutes(app);

// renderMiddleware matches the URL with react-router and renders the app into HTML
app.get('*', renderMiddleware);

/* eslint-disable no-console */
const _port = app.get('port');
if (_port) {
  app.listen(_port, (err) => {
    if (err) console.error(err);
    console.info(`===> 💻  Listening on port: ${_port}`);
    console.log('--------------------------');
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
/* eslint-enable no-console */
