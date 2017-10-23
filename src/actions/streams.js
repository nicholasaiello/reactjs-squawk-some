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

export const getTickersStream = (q, fltr) => (dispatch, getState) => {
  if (!q) {
    dispatch( getStream(null, null, []) );
    return;
  }

  const { tickers } = getState();
  api.getStream(q, tickers.sinceId || 0)
    .then((results) => dispatch( getStream(q, fltr, results) ))
    .catch(err => console.log(err));
};

export const getNewTickerStream = (q, fltr) => (dispatch, getState) => {
  if (!q) {
    dispatch( getStream(null, null, []) );
    return;
  }

  dispatch( newStream(q, fltr) );
  api.getStream(q, 0)
    .then((results) => dispatch( getStream(q, fltr, results) ))
    .catch(err => console.log(err));
};

// TODO rename
export const filterFeed = (fltr) => ({
  type: types.FILTER_FEED,
  fltr
});
