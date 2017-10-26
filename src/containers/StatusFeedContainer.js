import React from 'react';
import { connect } from 'react-redux';

import StatusFeed from '../components/StatusFeed';

const StatusFeedContainer = ({ nav, streams, dispatch }) => {
  return (
    <StatusFeed
      {...streams}
      fltr={nav.fltr}
      dispatch={dispatch} />
  );
};

const mapStateToProps = (state) => ({
  nav: state.nav,
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
