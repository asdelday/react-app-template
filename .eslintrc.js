module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['', '.json', '.js', '.jsx'],
        moduleDirectory: ['app', 'node_modules']
      }
    }
  },
  globals: {
    __DEVELOPMENT__: true,
    __CLIENT__: true,
    __SERVER__: true,
    __DISABLE_SSR__: true,
    __DEVTOOLS__: true
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',

    'valid-jsdoc': [2, { 'requireReturn': false }],

    'react/prefer-stateless-function': 'off',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off'
  },
};
