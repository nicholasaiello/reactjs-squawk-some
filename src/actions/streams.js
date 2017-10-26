import * as types from '../constants/ActionTypes';
import * as api from '../api/streams';
import {
  startProgressBar,
  stopProgressBar,
  updateNavQuery,
  updateNavFilter
} from './nav';
import { getMetaStock } from './meta';

const getStream = (query, results = []) => ({
  type: types.FETCH_STREAM,
  query,
  results
});

const newStream = (query) => ({
  type: types.NEW_STREAM,
  query
});

// TODO this behaves more like a refresh
export const getTwitterStream = (q) => (dispatch, getState) => {
  const { query, sinceId } = getState().streams;

  q = q || query;
  if (!q) {
    return dispatch( getStream(q, []) );
  }

  api.getTwitterStream(q, sinceId || 0)
    .then((results) => dispatch( getStream(q, results) ))
    .catch(err => console.log(err));
};

export const getNewTwitterStream = (q, fltr) => (dispatch, getState) => {
  if (!q) {
    return dispatch( getStream(null, []) );
  }

  dispatch(stopProgressBar());
  dispatch(newStream(q, fltr));

  api.getTwitterStream(q, 0)
    .then((results) => {
      dispatch(getStream(q, results));

      // TODO determine which meta to load
      if (q.charAt(0) === '$') {
        dispatch(getMetaStock(q));
      }

      dispatch(updateNavQuery(q));
      dispatch(updateNavFilter(fltr));
      dispatch(startProgressBar());
    })
    .catch(err => console.log(err));
};
