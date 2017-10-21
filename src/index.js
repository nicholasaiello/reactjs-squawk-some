import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './store';
import App from './App';

import './index.css';

import { getTickersStream } from './actions/streams';

const q = 'cubs';

// TODO remove after testing
store.dispatch(getTickersStream(q));
const iid = setInterval(() => {
  store.dispatch(getTickersStream(q));
}, 1000 * 60 * 1);

console.log('interval', iid);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app-root'));
