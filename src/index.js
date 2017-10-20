import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './store';
import App from './App';

import './index.css';

import { getTickerStream } from './actions/streams';

const q = 'cubs';

// TODO remove after testing
store.dispatch(getTickerStream(q));
const iid = setInterval(() => {
  store.dispatch(getTickerStream(q));
}, 1000 * 60 * 2);

console.log('interval', iid);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app-root'));
