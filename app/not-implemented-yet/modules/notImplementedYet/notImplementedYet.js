export const initialState = {
  text: 'Not implemented yet.',
};

/**
 * App Reducer, which will contains the state related to the application settings and configuration
 * @param {object} state Current state
 * @param {object} action Desired action
 * @return {*} returns the reducer state after action
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
