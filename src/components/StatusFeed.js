import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const FeedItem = ({ item }) => (
  <li className={"feed-item"} style={{backgroundImage: `url('${item.user_profile_img}')`}}>
    <p>
      <strong>
        <a href={`https://twitter.com/${item.user_screen_name}`} target="_blank">{item.user_name}</a>
      </strong> {item.text}
    </p>
    <small>{item.created_at}</small>
  </li>
);

export default class StatusFeed extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { feed, count } = this.props;

    return (
      <ul id={"feed-wrapper"}>
        <ReactCSSTransitionGroup
          transitionName="feed-item"
          transitionAppear={true}
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
            {feed.toArray().map((x,i) => (
              <FeedItem key={count - i} item={x} />
            ))}
        </ReactCSSTransitionGroup>
      </ul>
    );
  }

};
