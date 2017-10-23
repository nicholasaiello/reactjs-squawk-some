import * as types from '../constants/ActionTypes';
import * as api from '../api/streams';

const getStream = (query, results = []) => ({
  type: types.FETCH_STREAM,
  query,
  results
});

const newStream = (query) => ({
  type: types.NEW_STREAM
});

export const getTickersStream = (q) => (dispatch, getState) => {
  if (!q) {
    dispatch( getStream(null, []) );
    return;
  }

  const { tickers } = getState();
  api.getStream(q, tickers.sinceId || 0)
    .then((results) => dispatch( getStream(q, results) ))
    .catch(err => console.log(err));
};

export const getNewTickerStream = (q, fltr) => (dispatch, getState) => {
  if (!q) {
    dispatch( getStream(null, []) );
    return;
  }

  dispatch( newStream(q) );
  api.getStream(q, 0)
    .then((results) => dispatch( getStream(q, results) ))
    .catch(err => console.log(err));
};
