# POS WEB REACT APP TEMPLATE

Template for creating React + Redux universal applications.

# WIP: This boilerplate is still being developed

## About

This is a starter boilerplate to create react applications which uses the following technologies:

  * **Core:**
    * [Universal Rendering](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.47esoqjsl)
    * [Express](http://expressjs.com/) - Web Framework for Node.js
    * [React](https://facebook.github.io/react/) - Javascript library for building user interfaces 
    * [React-DOM](https://facebook.github.io/react/) - React sub-library
    * [React Router](https://github.com/ReactTraining/react-router) - Router library for React
    * [React Helmet](https://github.com/nfl/react-helmet) - A document head manager for React
    * [Redux](http://redux.js.org/) - Application state management system
    * [Reselect](https://github.com/reactjs/reselect) - Selector library for Redux to improve performance
    * [Redux Saga](https://redux-saga.github.io/redux-saga/) - Library that aims to make side effects in React/Redux applications easier and better
    * [Classnames](https://github.com/JedWatson/classnames) - A simple javascript utility for conditionally joining classNames together
    * [Webpack Isomorphic Tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) - Server-side rendering for your Webpack-built applications
  
  * **JS Compilers:**
    * [Babel](https://babeljs.io/) ES6 and ES7 Javascript compiler
  
  * **CSS Compilers:**
    * [CSSNext](http://cssnext.io/) Compiler to use the next css (CSS4) generation

  * **Bundlers:**  
    * [Webpack](https://webpack.github.io/) - Javascript module bundler

  * **Linting:**
    * [ESLint](http://eslint.org/) - Javascript linting utility
    * [Config Airbnb](https://github.com/airbnb/javascript) - Airbnb ESLint configuration

  * **Testing:**
    * [Karma](https://karma-runner.github.io/1.0/index.html) - Javascript test runner
    * [PhantomJS](http://phantomjs.org/) - Headless webkit browser for testing purposes
    * [Mocha](https://mochajs.org/) - Javascript testing framework
    * [Chai](http://chaijs.com/) - Assertions library
    * [Enzyme](https://github.com/airbnb/enzyme) - Javascript Testing utilities for React
    * [Sinon](http://sinonjs.org/) - Test Spies, Stubs and Mocks
    * [Istanbul Code Coverage]() - Testing coverage
  
  * **Other tools:**
    * [Better NPM Run](https://github.com/benoror/better-npm-run) - Cross Platform smart and easy way to handle environment variables
    * [Webpack Dev Server](https://github.com/webpack/webpack-dev-server) - Server for development purposes
    * [React Hot Loader](https://github.com/gaearon/react-hot-loader) - Enables the awesome React Hot Loader feature for a better development experience
    * [Redux DevTools](https://github.com/gaearon/redux-devtools) - DevTools for Redux with hot reloading, action replay, and customizable UI
  
## How to use

### Installation

**Important:** be care, this project has its own `.npmrc` to configure some rules for the package manager.

```bash
npm install
```

### Running Dev Server

Runs a server for development purposes [ONLY]

```bash
npm run dev
```

or in separated processes
```bash
npm run start-dev
npm run watch-client
```

### Running Production Server

**Important**: Before start the production server you have to build the bundles

```bash
npm run start-prod
```

or
```bash
npm start
```

### Building

To create the bundles for the component run

```bash
npm run build
```

Anyway the `prepublish` trigger will do it for you before you publish the package

### Testing

To `singleRun` the tests
(this command also fires after the tests the `linting` thanks to `posttest` trigger):

```bash
npm test
```

To a `TDD` or `watch` run mode:

```bash
npm run test:watch
```

Anyway the `preversion` trigger will do it for you before change the package version

### Linting

To check the Javascript linting run:

```bash
npm run lint
```

Anyway the `posttest` trigger will do it for you after all the tests are passed

### Upgrading version

Major

```bash
npm run version-major
```

Minor

```bash
npm run version-minor
```

Patch

```bash
npm run version-patch
```

### Documentation

Run Documentation server

```bash
npm run styleguide-server
```

Build Documentation

```bash
npm run styleguide-build
```

### Using Redux DevTools

[Redux Devtools](https://github.com/gaearon/redux-devtools) are enabled by default in development.

- <kbd>CTRL</kbd>+<kbd>H</kbd> Toggle DevTools Dock
- <kbd>CTRL</kbd>+<kbd>Q</kbd> Move DevTools Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detailed information.

If you have the 
[Redux DevTools chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) installed it will automatically be used on the client-side instead.

If you want to disable the dev tools during development, set `__DEVTOOLS__` to `false` in `/webpack/dev.config.js`.  
DevTools are not enabled during production.


## TODO:

- Update to react-router v4
- ~~Update to Webpack 2~~
- Enable Tree Shaking
- Remove webpack-isomorphic-tools for SSR
- Implements PWA
- Improve Documentation
- Clean unnecessary dependencies
- Improve testing
- Centralize config
- Change public env variables to use a .env file instead better-npm-run
