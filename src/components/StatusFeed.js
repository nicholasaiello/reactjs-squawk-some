import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { getTickersStream } from '../actions/streams';

import StatusFeedItem from './StatusFeedItem';

export default class StatusFeed extends Component {

  constructor(props) {
    super(props);
    this.syncFeedIntervalId = 0;
  }

  componentDidMount() {
    console.log(this.props, this.state)
    this.handleFeedSync();
  }

  componentWillUnmount() {
    clearTimeout(this.syncFeedIntervalId);
  }

  handleFeedSync = () => {
    if (this.syncFeedIntervalId) {
      clearTimeout(this.syncFeedIntervalId);
    }

    const { query, dispatch } = this.props;

    dispatch(getTickersStream(query || 'android'));
    this.syncFeedIntervalId = setInterval(() => {
      dispatch(getTickersStream(query || 'android'));
    }, 1000 * 60 * 1);
  }

  render() {
    const { query, feed, count } = this.props;

    return (
      <ul id={"feed-wrapper"}>
        <ReactCSSTransitionGroup
          transitionName="feed-item"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
            {feed.toArray().map((x,i) => (
              <StatusFeedItem key={count - i} query={query} item={x} />
            ))}
        </ReactCSSTransitionGroup>
      </ul>
    );
  }

};
