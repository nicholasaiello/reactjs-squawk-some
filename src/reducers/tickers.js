import * as types from '../constants/ActionTypes';
import MaxSizeStack from '../components/MaxSizeStack';

const initialState = {
  feed: MaxSizeStack(),
  query: null,
  count: 0,
  sinceId: 0
};

const buildNewState = (feed, action) => {
  const { results, query } = action;

  if (results && results.statuses) {
    feed.addAll(results.statuses.slice());
  }

  const count = feed.size();
  return {
    feed,
    query,
    count,
    sinceId: count > 0 ? feed.get(0).id : 0
  };
};

// TODO naming is whack
export default function streams(state = initialState, action) {

  switch(action.type) {
    case types.NEW_STREAM:
      return buildNewState(MaxSizeStack(), action);
    case types.FETCH_STREAM:
      return buildNewState(
        state.feed.clone(), action);
    default:
      return state;
  }

};
