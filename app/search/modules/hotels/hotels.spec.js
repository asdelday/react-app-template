/* eslint-disable no-unused-expressions */
/* Avoid this issue: https://github.com/eslint/eslint/issues/2102 */

import { expect } from 'chai';
import reducer, {
  initialState,
} from './hotels';

/* REDUCER
 * ============================================================================================== */
describe('Hotels Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer()).to.be.deep.equal(initialState);
  });
});

/* ACTIONS
 * ============================================================================================== */

/* SAGAS HANDLERS
 * ============================================================================================== */
// TODO
