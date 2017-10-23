import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import MaxSizeStack from './components/MaxSizeStack';

import reducer from './reducers';

const storage = window.localStorage;
const initialState = {
  streams: {
    feed: MaxSizeStack(),
    query: storage.getItem('_lastQuery') || '',
    fltr: storage.getItem('_lastFilter') || '',
    count: 0,
    sinceId: storage.getItem('_lastSinceId') || 0
  }
};

const middleware = [ thunk ];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
