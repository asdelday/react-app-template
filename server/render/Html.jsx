/* eslint-disable react/no-danger */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the pageRenderer.js file.
 */

class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object,
  };

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.renderStatic();
    const styles = (assets && assets.styles) || undefined;
    const javascript = (assets && assets.javascript) || undefined;

    return (
      <html lang="en-US">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700"
            rel="stylesheet"
          />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {styles && Object.keys(styles).map(styleKey => (
            <link
              href={styles[styleKey]}
              key={`style-${styleKey}`}
              rel="stylesheet"
              type="text/css"
              media="screen, projection"
              charSet="UTF-8"
            />
          ))}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />

          <script
            dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
            charSet="UTF-8"
          />

          {/* javascripts */}
          {javascript && Object.keys(javascript).map(scriptKey => (
            <script src={javascript[scriptKey]} key={`script-${scriptKey}`} charSet="UTF-8" />
          ))}
        </body>
      </html>
    );
  }
}

export default Html;
