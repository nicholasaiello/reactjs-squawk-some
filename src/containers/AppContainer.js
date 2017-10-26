import React from 'react';
import { connect } from 'react-redux';

import App from '../App';

const AppContainer = ({ nav, meta, searches, streams, dispatch }) => {
  return (
    <App
      {...streams}
      {...nav}
      meta={meta}
      searches={searches}
      dispatch={dispatch} />
  );
};

const mapStateToProps = (state) => ({
  meta: state.meta,
  nav: state.nav,
  searches: state.searches,
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
