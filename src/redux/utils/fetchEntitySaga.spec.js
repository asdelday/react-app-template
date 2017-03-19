import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import fetchEntity from './fetchEntitySaga';

describe('fetchEntity Saga', () => {
  const requestFunction = () => {};
  const successFunction = () => {};
  const errorFunction = () => {};

  const entity = {
    request: () => requestFunction,
    success: () => successFunction,
    failure: () => errorFunction,
  };

  it('should work if there is no error', () => {
    const generator = fetchEntity(entity, requestFunction);

    expect(generator.next().value).to.be.deep.equal(put(requestFunction));
    expect(generator.next().value).to.be.deep.equal(call(requestFunction));
    expect(generator.next().value).to.be.deep.equal(put(successFunction));
    expect(generator.next().done).to.be.deep.equal(true);
  });

  it('should handle errors', () => {
    const generator = fetchEntity(entity, requestFunction);

    expect(generator.next().value).to.be.deep.equal(put(requestFunction));
    expect(generator.next().value).to.be.deep.equal(call(requestFunction));
    expect(generator.next().value).to.be.deep.equal(put(successFunction));
    expect(generator.throw({ error: 'test error' }).value).to.be.deep.equal(put(errorFunction));
    expect(() => generator.next()).to.throw({ error: 'test error' });
  });
});
