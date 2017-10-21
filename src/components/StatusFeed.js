import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import StatusFeedItem from './StatusFeedItem';

export default class StatusFeed extends Component {

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
