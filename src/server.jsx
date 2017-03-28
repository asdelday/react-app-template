import 'globalize';

import path from 'path';
import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import PrettyError from 'pretty-error';
import http from 'http';
import { match, createMemoryHistory as createHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import config from './config';
import createStore from './redux/create';
import Html from './helpers/Html';
import RootContainer from './containers/Root';
import getRoutes from './routes';
import assets from '../webpack-assets.json';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

console.log(process.cwd());
app.use(compression());
app.use(Express.static(path.join(process.cwd(), '..', 'static')));
app.use(favicon(path.join(process.cwd(), '..', 'static', 'favicon.ico')));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    global.webpackIsomorphicTools.refresh();
  }

  const originalUrl = req.originalUrl;

  const memoryHistory = createHistory(originalUrl);
  const store = createStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = getRoutes(store);

  function hydrateOnClient() {
    const htmlComponent = <Html assets={assets} store={store} />;
    const renderedDomString = ReactDOM.renderToString(htmlComponent);
    res.send(`<!doctype html>\n ${renderedDomString}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match(
    { history, routes, location: originalUrl }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', pretty.render(error)); // eslint-disable-line no-console
        res.status(500);
        hydrateOnClient();
      } else if (renderProps) {
        global.navigator = { userAgent: req.headers['user-agent'] };

        const component = <RootContainer store={store} history={history} />;
        const htmlComponent = <Html assets={assets} component={component} store={store} />;
        const renderedDomString = ReactDOM.renderToString(htmlComponent);

        res.status(200).send(`<!doctype html>\n ${renderedDomString}`);

        store.close();
      } else {
        res.status(404).send('Not found');
      }
    },
  );
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port); // eslint-disable-line no-console, max-len
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified'); // eslint-disable-line no-console, max-len
}
