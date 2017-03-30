/**
 * Retrieve an array with the rules for the javascript [babel] due to the configuration passed
 * @param {boolean} production - flag which indicates if is a production env
 * @return {[*]} returns the array with the rules for the javascript [babel]
 */
export default ({ production = false } = {}) => {
  let rules = [
    { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
  ];

  if (!production) {
    rules = rules.concat(
      // ENABLE LINTER
      { test: /\.jsx?$/, exclude: /node_modules/, enforce: 'pre', loader: 'eslint-loader' },
    );
  }

  return rules;
};
