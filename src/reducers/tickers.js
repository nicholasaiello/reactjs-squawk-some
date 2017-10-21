import * as types from '../constants/ActionTypes';

const MAX_FEED_SIZE = 250;

const initialState = {
  feed: [],
  count: 0
};

const MaxSizeStack = (size) => {

  let arr = [];

  const _getLast = () => (
    arr.length > 0 ? arr[-1] : null
  );

  const _add = (item) => {
    feed.unshift(item);
  };

  const _addAll = (items) => {
    const lastStatusDate = _getLast();
    for (let i = len - 1; i >= 0; i--) {
        const obj = items[i];
        if ((Date.parse(obj.created_at)) > lastStatusDate) {
          _add(obj);
        }
    }

    const diff = feed.length - MAX_FEED_SIZE;
    if (diff > 0) {
      feed.splice(0, MAX_FEED_SIZE);
    }
  };

  return {
    size: {
      return arr.length
    },
    add: _add,
    addAll: _addAll
  };

};

const mergeStreams = (state, action) => {
  const { q, results } = action,
    newState = {...state};

  const feed = newState.feed || [null],
    lastStatus = feed[0];

  if (!lastStatus) {
    newState.feed = results.statuses.slice();
  } else {
    const len = results.statuses.length,
      lastStatusDate = Date.parse(lastStatus.created_at);

    for (let i = len - 1; i >= 0; i--) {
        const obj = results.statuses[i];
        if ((Date.parse(obj.created_at)) > lastStatusDate) {
          feed.unshift(obj);
        }
    }

    // trim array if too large
    const diff = feed.length - MAX_FEED_SIZE;
    if (diff > 0) {
      feed.splice(0, MAX_FEED_SIZE);
    }

    newState.count = feed.length;
    newState.feed = feed;
}

// TODO rename file
const streams = (state = initialState, action) => {

  switch(action.type) {
    case types.FETCH_STREAM:
      return mergeStreams(stat, action);
    default:
      return state;
  }

};

export default streams;
