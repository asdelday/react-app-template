import express from 'express';
import path from 'path';
import gzip from 'compression';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import { PORT, NODE_ENV } from '../../config/env';
import * as PATHS from '../../config/paths';

/**
 * Initialize the Express application passed by arguments
 * @param {express} app - Express app instance
 */
export default (app) => {
  app.set('port', PORT || 3000);

  if (NODE_ENV === 'production') {
    app.use(gzip());
  }

  app.use(bodyParser.json());
  // for parsing application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(path.join(process.cwd(), PATHS.static)));
  app.use(favicon(path.join(process.cwd(), PATHS.static, 'favicon.ico')));

  /* eslint-disable no-console */
  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log(`===>  Environment: ${NODE_ENV}`);
  console.log('--------------------------');
  /* eslint-enable no-console */
};
