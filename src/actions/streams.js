import * as types from '../constants/ActionTypes';
import * as api from '../api/streams';

const getStream = (query, results = []) => ({
  type: types.FETCH_STREAM,
  query,
  results
});

export const getTickersStream = (q) => (dispatch, getState) => {
  const { tickers } = getState();
  api.getStream(q, tickers.sinceId || 0)
    .then((results) => dispatch( getStream(q, results) ))
    .catch(err => console.log(err));
};
