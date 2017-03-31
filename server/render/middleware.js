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

  // TODO: __DISABLE_SSR__ + hydrateOnClient

  match({ routes, history, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).json(error);
      // TODO: hydrateOnClient
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
