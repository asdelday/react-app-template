const PATHS = require('../../config/paths');

/**
 * Retrieve an array with the rules for the images due to the configuration passed
 * @param {number} limit - set the limit for the url loader
 * @returns {array} returns the array with the rules for the images
 */
module.exports = ({ limit = 10000 } = {}) => [
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    loader: 'url-loader',
    options: { name: '[hash].[ext]', limit },
    include: PATHS.app,
  },
];
