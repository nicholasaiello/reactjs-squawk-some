import * as types from '../constants/ActionTypes';

const initialState = {};

const meta = (state = initialState, action) => {
  switch(action.type) {
    case types.FETCH_STOCK:
      return {...state, ...action.result};
    default:
      return state;
  }

};

export default meta;
