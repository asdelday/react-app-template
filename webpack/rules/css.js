const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');
const PATHS = require('../../config/paths');

/**
 * Retrieve an array with the rules for the javascript [babel] due to the configuration passed
 * @param {boolean} production - flag which indicates if is a production env
 * @param {boolean} browser - flag which indicates if is a browser platform
 * @return {[*]} returns the array with the rules for the javascript [babel]
 */
module.exports = ({ production = false, browser = false } = {}) => {
  /**
   * Read more about css-loader options
   * https://webpack.js.org/loaders/css-loader/#options
   *
   * For server-side rendering we use css-loader/locals as we do not want to
   * embed CSS. However, we still require the mappings to insert as className in
   * our views.
   *
   * Referenced from: https://github.com/webpack-contrib/css-loader#css-scope
   *
   * For prerendering with extract-text-webpack-plugin you should use
   * css-loader/locals instead of style-loader!css-loader in the prerendering bundle.
   * It doesn't embed CSS but only exports the identifier mappings.
   *
   * @param {string} [localIndentName] - how css modules are resolved
   * @param {boolean} [embedCssInBundle=false] - embedCssInBundle
   * @param {boolean} [modules=true] - Enable/Disable CSS Modules
   * @param {boolean} [sourceMap=true] - Enable/Disable Sourcemaps
   * @param {number} [importLoaders=1] - Number of loaders applied before CSS loader
   * @return {[*,*]} returns css rules
   *
   * @private
   */
  const createCssRules = ({
    localIndentName = 'localIdentName=[name]__[local]___[hash:base64:5]',
    embedCssInBundle = false,
    modules = true,
    sourceMap = true,
    importLoaders = 1,
  } = {}) => [
    {
      loader: embedCssInBundle ? 'css-loader' : 'css-loader/locals',
      options: { localIndentName, sourceMap, modules, importLoaders },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          postcssImport(),
          postcssCssnext({ browsers: ['> 1%', 'last 2 versions'] }),
          postcssReporter({ clearMessages: true }),
        ],
      },
    },
  ];

  const createBrowserRules = extractCssToFile => (loaders) => {
    if (extractCssToFile) {
      return ExtractTextPlugin.extract({ fallback: 'style-loader', use: loaders });
    }

    return [{ loader: 'style-loader' }, ...loaders];
  };

  const serverRules = createCssRules({ embedCssInBundle: false });
  const nonServerRules = createCssRules({ embedCssInBundle: true });
  const browserRules = createBrowserRules(production)(nonServerRules);

  return [
    {
      test: /\.css$/,
      use: browser ? browserRules : serverRules,
      include: PATHS.app,
    },
  ];
};
