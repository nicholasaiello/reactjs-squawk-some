import * as types from '../constants/ActionTypes';
import MaxSizeStack from '../components/MaxSizeStack';

const initialState = {
  feed: MaxSizeStack(),
  query: null,
  count: 0,
  sinceId: 0
};

// TODO naming is whack
export default function streams(state = initialState, action) {

  switch(action.type) {
    case types.FETCH_STREAM:
      const { results, query } = action,
        feed = state.feed.clone();

      feed.addAll(results.statuses.slice());

      return {
        feed,
        query,
        count: feed.size(),
        sinceId: state.sinceId + 1
      };
    default:
      return state;
  }

};
