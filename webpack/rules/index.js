import javascript from './javascript';
import css from './css';
import image from './image';
import font from './font';

/**
 * Retrieve an array with the rules due to the configuration passed
 * @param {boolean} production - flag which indicates if is a production env
 * @param {boolean} browser - flag which indicates if is a browser platform
 * @returns {Array<*>} returns the array with the rules
 */
export default ({ production = false, browser = false } = {}) => {
  const params = { production, browser };

  return [].concat(
    javascript(params),
    css(params),
    image(),
    font(),
  );
};
