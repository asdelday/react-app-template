import { match, createMemoryHistory as createHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from 'redux/create';
import getRoutes from 'routes';
import pageRenderer from './pageRenderer';

export default function render(req, res) {
  const location = req.originalUrl; // req.url ?
  const memoryHistory = createHistory(location);
  const store = createStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = getRoutes();

  function hydrateOnClient() {
    const html = pageRenderer(store);
    res.status(200).send(html);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ routes, history, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error('ROUTER ERROR:', error); // eslint-disable-line no-console
      res.status(500);
      hydrateOnClient();
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const html = pageRenderer(store, renderProps, history);
      res.status(200).send(html);
    } else {
      res.status(404).send('Not found');
    }
  });
}
