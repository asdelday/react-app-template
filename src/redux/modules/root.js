import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fork } from 'redux-saga/effects';

import search, { rootSaga as searchSagas } from 'search/modules/root';
import notImplementedYet from 'not-implemented-yet/modules/notImplementedYet';
import app from './app';

/* REDUCER
 * ---------------------------------------------------------------------------------------------- */
export default combineReducers({
  routing: routerReducer,

  app,
  search,
  notImplementedYet,
});

/* SAGA
 * ---------------------------------------------------------------------------------------------- */
export function* rootSaga() {
  yield [
    fork(searchSagas),
  ];
}
