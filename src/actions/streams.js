import * as types from '../constants/ActionTypes';
import * as api from '../api/streams';

const getStream = (results = []) => ({
  type: types.FETCH_STREAM,
  results
});

export const getTickerStream = q => (dispatch) => {
  api.getStream(q)
    .then((results) => dispatch( getStream(results) ))
    .catch(err => console.log(err));
};
