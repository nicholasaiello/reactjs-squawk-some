import * as types from '../constants/ActionTypes';

const initialState = {},
  storage = window.localStorage;

const storeNewState = (state) => {
  storage.setItem('_savedSearches', JSON.stringify(state));
};

const searches = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case types.ADD_SEARCH:
      newState = {
        ...state,
        [action.query]: {
          fltr: action.fltr || ''
        }
      };
      storeNewState(newState);
      return newState;
    case types.REMOVE_SEARCH:
      newState = {...state};
      delete newState[action.query];
      storeNewState(newState);
      return newState;
    default:
      return state;
  }

};

export default searches;
