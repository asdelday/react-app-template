import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import reducer from './modules/root';

const getStoreCreator = (middleware) => {
  const composedBy = [];

  // MIDDLEWARE
  if (middleware && middleware.length) {
    composedBy.push(applyMiddleware(...middleware));
  }

  // DEVTOOLS
  if (__DEVTOOLS__) {
    const devToolsExtension = (
      typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    if (devToolsExtension) {
      composedBy.push(devToolsExtension);
    } else if (__DEVELOPMENT__ && __CLIENT__) {
      const { persistState } = require('redux-devtools');
      const DevTools = require('containers/DevTools');

      composedBy.push(
        DevTools.instrument(),
        persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/)),
      );
    }
  }

  return composedBy.length ? compose(...composedBy)(createStore) : createStore;
};

export default (history, data) => {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  // Create saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // All your middleware goes here
  const middleware = [reduxRouterMiddleware, sagaMiddleware];

  // Create the store
  const store = getStoreCreator(middleware)(reducer, data);

  // Enable reducer module hot replacement
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/root', () => {
      store.replaceReducer(require('./modules/root'));
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};
