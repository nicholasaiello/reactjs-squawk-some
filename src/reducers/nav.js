import * as types from '../constants/ActionTypes';

const initialState = {},
  storage = window.localStorage;

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
      storage.setItem('_lastQuery', action.query);
      return {
        ...state,
        query: action.query
      };
    case types.UPDATE_NAV_FILTER:
      storage.setItem('_lastFilter', action.fltr);
      return {
        ...state,
        fltr: action.fltr
      };
    case types.INCREMENT_PROGRESS:
      return {
        ...state,
        progress: state.progress + 1
      };
    case types.START_PROGRESS:
      return {
        ...state,
        progress: 0
      };
    case types.STOP_PROGRESS:
      return {
        ...state,
        progress: -1
      };
    default:
      return state;
  }

};

export default nav;
