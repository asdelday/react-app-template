import PATHS from '../../config/paths';

/**
 * Retrieve an array with the rules for the fonts due to the configuration passed
 * @param {number} limit - set the limit for the url loader
 * @returns {array} returns the array with the rules for the fonts
 */
export default ({ limit = 10000 } = {}) => [
  {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader',
    options: { name: '[hash].[ext]', limit, mimetype: 'application/font-woff' },
    include: PATHS.app,
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader',
    options: { name: '[hash].[ext]', limit, mimetype: 'application/octet-stream' },
    include: PATHS.app,
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
    include: PATHS.app,
  },
];
