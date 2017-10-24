import * as types from '../constants/ActionTypes';

export const addSavedSearch = (query, fltr) => ({
  type: types.ADD_SEARCH,
  query,
  fltr
});

export const removeSavedSearch = (query) => ({
  type: types.REMOVE_SEARCH,
  query
});
