import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import MaxSizeStack from './components/MaxSizeStack';

import reducer from './reducers';

const storage = window.localStorage;
const initialState = {
  nav: {
    drawerOpen: false,
    query: storage.getItem('_lastQuery') || '',
    fltr: storage.getItem('_lastFilter') || ''
  },
  searches: JSON.parse(storage.getItem('_savedSearches') || '{}'),
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
