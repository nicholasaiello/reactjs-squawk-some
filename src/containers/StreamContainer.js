import React from 'react';
import { connect } from 'react-redux';

const FeedItem = ({ item }) => (
  <li style={{backgroundImage: `url('${item.user_profile_img}')`}}>
    <p>
      <strong>
        <a href={`https://twitter.com/${item.user_screen_name}`} target="_blank">{item.user_name}</a>
      </strong> {item.text}
    </p>
    <small>{item.created_at}</small>
  </li>
);

const StreamContainer = (state) => {
  // TODO break LI out to feed item/row
  const { feed } = state.tickers;
  return (
    <ul id={"feed-wrapper"}>
    {feed.toArray().map((x,i) => (
      <FeedItem key={i} item={x} />
    ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  ...state
});

export default connect(
  mapStateToProps,
  {}
)(StreamContainer);
