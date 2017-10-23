import React from 'react';
import { connect } from 'react-redux';

import StatusFeed from '../components/StatusFeed';

const StatusFeedContainer = ({ streams, dispatch }) => {
  return (
    <StatusFeed {...streams} dispatch={dispatch} />
  );
};

const mapStateToProps = (state) => ({
  streams: state.streams
});

export default connect(
  mapStateToProps,
  {
    dispatch: (dispatch) => {
      return dispatch
    }
  }
)(StatusFeedContainer);
