import * as types from '../constants/ActionTypes';
import { BASE_API_URL } from '../constants/Env';

// TODO move to service file
function* getNextSinceId() {
  let i = 0;
  while (i < Number.MAX_SAFE_INTEGER) {
    yield i;
    i++;
  }
}

const getStream = (results = []) => ({
  type: types.FETCH_STREAM,
  results
});

export const getTickerStream = q => (dispatch) => {
  // TODO move to an api service object
  // const since = getNextSinceId().next();
  // console.log(since);
  fetch(`${BASE_API_URL}/streams/?q=${q}&_=${+new Date}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) => dispatch( getStream(json.results || []) ))
    .catch(err => console.log(err));

};
