import { put, call } from 'redux-saga/effects';

/**
 * Reusable fetch Subroutine
 * @param {object} entity - object with the respective actions for a fetch flow: request, success...
 * @param {function} apiFn - method which execute the fetch call
 * @param {object} params - rest of the params and data
 * which are going to be sent to the fetch request
 * @constructor
 */
export default function* fetchEntity(entity, apiFn, ...params) {
  yield put(entity.request());
  try {
    const response = yield call(apiFn, ...params);
    yield put(entity.success(response));
    return response;
  } catch (error) {
    yield put(entity.failure(error));
    throw error;
  }
}
