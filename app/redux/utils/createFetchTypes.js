export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export default (base) => {
  const types = { BASE: base };

  /* Smart way but not IDLE friendly
   [REQUEST, SUCCESS, FAILURE].forEach(type => {
   types[type] = `${base}_${type}`;
   });
   */

  types.REQUEST = `${base}_REQUEST`;
  types.SUCCESS = `${base}_SUCCESS`;
  types.FAILURE = `${base}_FAILURE`;

  return types;
};
