/* eslint-disable no-unused-expressions */
/* Avoid this issue: https://github.com/eslint/eslint/issues/2102 */

import { expect } from 'chai';
import reducer, {
  initialState,
} from './flights';

/* REDUCER
 * ============================================================================================== */
describe('Flights Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer()).to.be.deep.equal(initialState);
  });
});

/* ACTIONS
 * ============================================================================================== */
