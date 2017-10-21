import React from 'react';
import { connect } from 'react-redux';

import StatusFeed from '../components/StatusFeed';

const StreamContainer = ({ tickers }) => {
  const { feed, count } = tickers;
  return (
    <StatusFeed feed={feed} count={count} />
  );
};

const mapStateToProps = (state) => ({
  ...state
});

export default connect(
  mapStateToProps,
  {}
)(StreamContainer);
