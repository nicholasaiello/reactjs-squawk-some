import * as types from '../constants/ActionTypes';
import MaxSizeStack from '../components/MaxSizeStack';

const initialState = {};

const buildNewState = (feed, action) => {
  const { results, query, fltr } = action;

  if (results && results.statuses) {
    feed.addAll(results.statuses.slice());
  }

  const count = feed.size();
  return {
    feed,
    query,
    fltr,
    count,
    sinceId: count > 0 ? feed.get(0).id : 0
  };
};

// TODO naming is whack
const streams = (state = initialState, action) => {

  switch(action.type) {
    case types.NEW_STREAM:
      return buildNewState(MaxSizeStack(), action);
    case types.FETCH_STREAM:
      return buildNewState(state.feed.clone(), action);
    case types.FILTER_FEED:
      return {...state, fltr: action.fltr.trim()};
    default:
      return state;
  }

};

export default streams;
