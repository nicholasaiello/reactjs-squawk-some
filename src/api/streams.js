import * as types from '../constants/ActionTypes';
import { BASE_API_URL } from '../constants/Env';

function* _getSinceId() {
  let i = 0;
  while (i < Number.MAX_SAFE_INTEGER) {
    yield i;
    i++;
  }
}

const getNextSinceId = () => (
  _getSinceId().next().value
);

export const getStream = (q) => {
  const since = getNextSinceId();
  console.log('getStream', since);
  return fetch(`${BASE_API_URL}/streams/?q=${q}&since=${since}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((json) => json.results || []);
};
