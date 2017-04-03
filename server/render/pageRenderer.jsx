import React from 'react';
import { renderToString } from 'react-dom/server';

import Html from 'helpers/Html';
import RootContainer from 'containers/Root';
import assets from '../../webpack-assets.json';

// TODO
const getAssets = () => {
  if (!assets) return undefined;

  return Object.keys(assets).reduce((assetsResult, assetKey) => {
    const asset = assets[assetKey];
    const _assetsResult = assetsResult;

    if (!asset) return _assetsResult;
    if (asset.js) _assetsResult.javascript[asset.js] = asset.js;
    if (asset.css) _assetsResult.styles[asset.css] = asset.css;

    return _assetsResult;
  }, { styles: {}, javascript: {} });
};

const _assets = getAssets();

export default (store, props, history) => {
  const component = <RootContainer store={store} history={history} />;
  const htmlComponent = <Html assets={_assets} component={component} store={store} />;
  const renderedDomString = renderToString(htmlComponent);

  return `<!doctype html>\n ${renderedDomString}`;
};
