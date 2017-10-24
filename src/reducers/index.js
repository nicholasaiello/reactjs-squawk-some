import { combineReducers } from 'redux';

import nav from './nav';
import streams from './streams';
import searches from './searches';

export default combineReducers({
  nav,
  streams,
  searches
});
