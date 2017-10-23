import { BASE_API_URL } from '../constants/Env';

export const getStream = (q, sinceId) => (
  fetch(`${BASE_API_URL}/streams/?q=${encodeURIComponent(q)}&since=${sinceId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((json) => json.results || [])
);
