//  enable runtime transpilation to use ES6/7 in node

const fs = require('fs');

const babelrc = fs.readFileSync('./.babelrc');
let config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  /* eslint-disable max-len, no-console */
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
  /* eslint-enable max-len, no-console */
}

require('babel-register')(config);
