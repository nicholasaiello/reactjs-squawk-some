import { combineReducers } from 'redux';

import meta from './meta';
import nav from './nav';
import streams from './streams';
import searches from './searches';

export default combineReducers({
  meta,
  nav,
  streams,
  searches
});
