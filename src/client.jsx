/* THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER */
import 'theme/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

import createHistory from 'history/createBrowserHistory';

import { rootSaga } from './redux/modules/root';
import createStore from './redux/create';

const destinationElement = document.getElementById('root');
const history = createHistory();
const store = createStore(history, window.__data);

store.runSaga(rootSaga);

const configureComponentGetter = (injectDevTools = false) => {
  let innerComponent;

  if (injectDevTools && __DEVTOOLS__ && !window.devToolsExtension) {
    const DevTools = require('./containers/DevTools/DevTools');
    innerComponent = <DevTools />;
  }

  return () => {
    const Root = require('./containers/Root').default;

    const root = <Root store={store} history={history}>{innerComponent}</Root>;

    if (__DEVELOPMENT__ && module.hot) {
      const { AppContainer } = require('react-hot-loader');
      return <AppContainer>{root}</AppContainer>;
    }

    return root;
  };
};

// Render the Redux Provider with the component inside
if (__DEVTOOLS__ && !window.devToolsExtension) {
  ReactDOM.render(configureComponentGetter(false)(), destinationElement);
}

// After the initial render, re-render again to add Redux DevTools if are required
ReactDOM.render(configureComponentGetter(true)(), destinationElement);

// Enables Hot Module Replacement if we are in Dev env
if (__DEVELOPMENT__ && module.hot) {
  module.hot.accept('./containers/Root', () => {
    ReactDOM.render(configureComponentGetter(true)(), destinationElement);
  });
}
