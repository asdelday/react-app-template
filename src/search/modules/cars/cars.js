export const initialState = {
  text: 'Cars',
};

/**
 * Cars Reducer,
 * which will contains the state related to the application settings and configuration
 * @param {object} state State before the action has taken place
 * @param {object} action Action to execute
 * @return {*} State after the action has taken place
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

/* ACTIONS
* ---------------------------------------------------------------------------------------------- */

/* SELECTORS
 * ---------------------------------------------------------------------------------------------- */

/* SAGAS HANDLERS
 * ---------------------------------------------------------------------------------------------- */

/* SAGAS WATCHERS
 * ---------------------------------------------------------------------------------------------- */
