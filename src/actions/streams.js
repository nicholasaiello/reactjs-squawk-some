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

// TODO rename getTwitterStream
export const getTwitterStream = (q, fltr) => (dispatch, getState) => {
  if (!q) {
    return dispatch( getStream(q, fltr, []) );
  }

  const { streams } = getState();
  api.getStream(q, streams.sinceId || 0)
    .then((results) => dispatch( getStream(q, fltr, results) ))
    .catch(err => console.log(err));
};

// TODO rename getNewTwitterStream
export const getNewTwitterStream = (q, fltr) => (dispatch, getState) => {
  if (!q) {
    return dispatch( getStream(null, null, []) );
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
