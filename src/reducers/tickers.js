import * as types from '../constants/ActionTypes';

const initialState = {
  feed: [],
  count: 0
};

export default function tickers(state = initialState, action) {

  switch(action.type) {
    case types.FETCH_STREAM:
      const q = action.q,
      // TODO add meta
        newState = {...state},
        feed = newState.feed || [];

      const lastStatus = feed.length > 0 ? feed[0] : null;
      if (!lastStatus) {
        newState.feed = action.results.statuses.slice();
      } else {
        const len = action.results.statuses.length;
        for (let i = len - 1; i >= 0; i--) {
            const obj = action.results.statuses[i];
            if ((new Date(obj.created_at)) > (new Date(lastStatus.created_at))) {
              feed.unshift(obj);
            }
        }

        const diff = feed.length - 200;
        if (diff > 0) {
          // trim array
        }

        newState.count = feed.length;
        newState.feed = feed;
      }
      console.log(newState);
      return newState;
    default:
      return state;
  }

}
