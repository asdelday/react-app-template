/* eslint-disable no-unused-expressions */
/* Avoid this issue: https://github.com/eslint/eslint/issues/2102 */

import { expect } from 'chai';
import reducer, {
  initialState,
} from './cars';

/* REDUCER
* =============================================================================================== */
describe('Cars Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer()).to.be.deep.equal(initialState);
  });
});

/* ACTIONS
* =============================================================================================== */
