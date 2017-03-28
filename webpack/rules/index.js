const javascript = require('./javascript');
const css = require('./css');
const image = require('./image');
const font = require('./font');

/**
 * Retrieve an array with the rules due to the configuration passed
 * @param {boolean} production - flag which indicates if is a production env
 * @param {boolean} browser - flag which indicates if is a browser platform
 * @returns {Array<*>} returns the array with the rules
 */
module.exports = ({ production = false, browser = false } = {}) => {
  const params = { production, browser };

  return [].concat(javascript(params), css(params), image(), font());
};
