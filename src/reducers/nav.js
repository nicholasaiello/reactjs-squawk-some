import * as types from '../constants/ActionTypes';

const initialState = {};

const nav = (state = initialState, action) => {
  switch(action.type) {
    case types.SHOW_NAV_DRAWER:
      return {
        ...state,
        drawerOpen: true
      };
    case types.HIDE_NAV_DRAWER:
      return {
        ...state,
        drawerOpen: false
      };
    case types.TOGGLE_NAV_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen
      };
    case types.UPDATE_NAV_QUERY:
      return {
        ...state,
        query: action.query
      };
    case types.UPDATE_NAV_FILTER:
      return {
        ...state,
        fltr: action.fltr
      };
    default:
      return state;
  }

};

export default nav;
