import React from 'react';
import { connect } from 'react-redux';

import StatusFeed from '../components/StatusFeed';

const StatusFeedContainer = ({ tickers, dispatch }) => {
  return (
    <StatusFeed {...tickers} dispatch={dispatch} />
  );
};

const mapStateToProps = (state) => ({
  tickers: state.tickers
});

export default connect(
  mapStateToProps,
  {
    dispatch: (dispatch) => {
      return dispatch
    }
  }
)(StatusFeedContainer);
