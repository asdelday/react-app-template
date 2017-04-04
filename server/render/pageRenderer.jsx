import React from 'react';
import { renderToString } from 'react-dom/server';

import Html from 'helpers/Html';
import RootContainer from 'containers/Root';
import assets from './assets';

export default (store, props, history) => {
  const component = <RootContainer store={store} history={history} />;
  const htmlComponent = <Html assets={assets} component={component} store={store} />;
  const renderedDomString = renderToString(htmlComponent);

  return `<!doctype html>\n ${renderedDomString}`;
};
