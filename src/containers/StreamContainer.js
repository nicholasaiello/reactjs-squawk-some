import React from 'react';
import { connect } from 'react-redux';

const StreamContainer = (state) => {
  // TODO break LI out to feed item/row
  const { feed } = state.tickers;
  return (
    <ul id={"feed-wrapper"}>
    {feed.map((x,i) => (
      <li key={i} style={{backgroundImage: `url('${x.user_profile_img}')`}}>
        <p>
          <strong>{x.user_name}</strong> {x.text}
        </p>
        <small>{x.created_at}</small>
      </li>
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
