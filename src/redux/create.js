import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import reducer from './modules/root';

export default (history, data) => {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  // Create saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // All your middleware goes here
  const middleware = [reduxRouterMiddleware, sagaMiddleware];

  // Creating the store, we should consider in a different way when we are at
  // Development env bundling client with Devtools enabled
  let _createStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('containers/DevTools');

    _createStore = compose(
      applyMiddleware(...middleware),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/)),
    )(createStore);
  } else {
    _createStore = applyMiddleware(...middleware)(createStore);
  }

  // Create the store
  const store = _createStore(reducer, data);

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
