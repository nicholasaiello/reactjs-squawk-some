import * as types from '../constants/ActionTypes';
import * as api from '../api/streams';

const getStream = (results = []) => ({
  type: types.FETCH_STREAM,
  results
});

export const getTickersStream = (q) => (dispatch, getState) => {
  const { tickers } = getState();
  api.getStream(q, tickers.sinceId || 0)
    .then((results) => dispatch( getStream(results) ))
    .catch(err => console.log(err));
};
