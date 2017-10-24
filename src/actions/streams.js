import * as types from '../constants/ActionTypes';
import * as api from '../api/streams';

const getStream = (query, fltr, results = []) => ({
  type: types.FETCH_STREAM,
  query,
  fltr,
  results
});

const newStream = (query, fltr) => ({
  type: types.NEW_STREAM
});

export const getTwitterStream = (q, fltr) => (dispatch, getState) => {
  if (!q) {
    return dispatch( getStream(q, fltr, []) );
  }

  const { streams } = getState();
  api.getTwitterStream(q, streams.sinceId || 0)
    .then((results) => dispatch( getStream(q, fltr, results) ))
    .catch(err => console.log(err));
};

export const getNewTwitterStream = (q, fltr) => (dispatch, getState) => {
  if (!q) {
    return dispatch( getStream(null, null, []) );
  }

  dispatch( newStream(q, fltr) );
  api.getTwitterStream(q, 0)
    .then((results) => {
      dispatch(getStream(q, fltr, results));
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
