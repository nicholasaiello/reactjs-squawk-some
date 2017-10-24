import { BASE_API_URL } from '../constants/Env';

export const getTwitterStream = (q, sinceId) => (
  fetch(`${BASE_API_URL}/streams/twitter/?q=${encodeURIComponent(q)}&since=${sinceId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((json) => json.results || [])
);

export const getStockMeta = (s) => (
  fetch(`${BASE_API_URL}/meta/stocks/?s=${s.substr(1)}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((json) => json || {})
);
