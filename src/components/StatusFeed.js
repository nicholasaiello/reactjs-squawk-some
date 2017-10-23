import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import StatusFeedItem from './StatusFeedItem';

export default class StatusFeed extends Component {

  renderFeedItems() {
    const { query, feed, count } = this.props;

    return (
      feed.isEmpty()
        ? <li className="feed-item-empty">Search!!</li>
        : <ReactCSSTransitionGroup
            transitionName="feed-item"
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={100}>
              {feed.toArray().map((x,i) => (
                <StatusFeedItem key={count - i} query={query} item={x} />
              ))}
          </ReactCSSTransitionGroup>
    );
  }

  render() {
    const { query, feed, count } = this.props;

    return (
      <ul id={"feed-wrapper"}>
        {this.renderFeedItems()}
      </ul>
    );
  }

};
