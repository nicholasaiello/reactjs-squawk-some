import * as types from '../constants/ActionTypes';

export const showNavDrawer = () => ({
  type: types.SHOW_NAV_DRAWER
});

export const hideNavDrawer = () => ({
  type: types.HIDE_NAV_DRAWER
});

export const toggleNavDrawer = () => ({
  type: types.TOGGLE_NAV_DRAWER
});

export const updateNavQuery = (query) => ({
  type: types.UPDATE_NAV_QUERY,
  query
});

export const updateNavFilter = (fltr) => ({
  type: types.UPDATE_NAV_FILTER,
  fltr
});

export const incrementProgressBar = () => ({
  type: types.INCREMENT_PROGRESS
});

export const startProgressBar = () => ({
  type: types.START_PROGRESS
});

export const stopProgressBar = () => ({
  type: types.STOP_PROGRESS
});
