import { combineReducers } from 'redux';

import cars from 'search/modules/cars';
import flights from 'search/modules/flights';
import hotels from 'search/modules/hotels';

/* REDUCER
 * ---------------------------------------------------------------------------------------------- */
export default combineReducers({
  cars,
  flights,
  hotels,
});

/* SAGA
 * ---------------------------------------------------------------------------------------------- */
export function* rootSaga() {
  yield [];
}
