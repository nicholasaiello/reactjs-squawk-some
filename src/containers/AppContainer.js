import React from 'react';
import { connect } from 'react-redux';

import App from '../App';

const AppContainer = ({ dispatch }) => {
  return (
    <App dispatch={dispatch} />
  );
};

export default connect(
  (state) => (state),
  {
    dispatch: (dispatch) => {
      return dispatch;
    }
  }
)(AppContainer);
