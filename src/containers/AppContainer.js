import React from 'react';
import { connect } from 'react-redux';

import App from '../App';

const AppContainer = ({ streams, dispatch }) => {
  return (
    <App {...streams} dispatch={dispatch} />
  );
};

const mapStateToProps = (state) => ({
  streams: state.streams
});

export default connect(
  mapStateToProps,
  {
    dispatch: (dispatch) => {
      return dispatch;
    }
  }
)(AppContainer);
