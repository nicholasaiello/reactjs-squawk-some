import * as types from '../constants/ActionTypes';
import * as api from '../api/streams';
import { startProgressBar, stopProgressBar } from './nav';

const getStream = (query, results = []) => ({
  type: types.FETCH_STREAM,
  query,
  results
});

const newStream = (query) => ({
  type: types.NEW_STREAM,
  query
});

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

  dispatch(newStream(q, fltr));
  dispatch(stopProgressBar());

  api.getTwitterStream(q, 0)
    .then((results) => {
      dispatch(getStream(q, results));
      dispatch(startProgressBar());
      if (q.charAt(0) === '$') {
        dispatch(getMetaStock(q));
      }
      window.localStorage.setItem('_lastQuery', q);
    })
    .catch(err => console.log(err));
};

// TODO move
const getStock = (result) => ({
  type: types.FETCH_STOCK,
  result
});

export const getMetaStock = (symbol) => (dispatch) => {
  if (!symbol) {
    return;
  }

  api.getStockMeta(symbol)
    .then((result) => {
      dispatch(getStock(result));
    })
    .catch(err => console.log(err));
};
