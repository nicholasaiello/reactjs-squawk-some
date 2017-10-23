import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import StatusFeedItem from './StatusFeedItem';

export default class StatusFeed extends Component {

  renderFeedItems() {
    const { query, fltr, feed, count } = this.props;

    let results = feed.toArray();
    if (fltr) {
      // TODO profile this
      results = results.filter(x => (
        x.text.toLowerCase().indexOf(fltr) !== -1
      ));
    }

    return (
      feed.isEmpty()
        ? <li className="feed-item empty"></li>
        : <ReactCSSTransitionGroup
            transitionName="feed-item"
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={100}>
              {results.map((x,i) => (
                <StatusFeedItem key={count - i} query={query} item={x} />
              ))}
          </ReactCSSTransitionGroup>
    );
  }

  render() {
    return (
      <ul id={"feed-wrapper"}>
        {this.renderFeedItems()}
      </ul>
    );
  }

};
