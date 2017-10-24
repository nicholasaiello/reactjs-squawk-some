import React, { Component } from 'react';

import AppNav from './components/AppNav';
import AppDrawer from './components/AppDrawer';
import AppFooter from './components/AppFooter';

import AppSyncProgressBar from './components/AppSyncProgressBar';
import StatusFeedContainer from './containers/StatusFeedContainer';

import {
  updateNavQuery,
  updateNavFilter,
} from './actions/nav';
import {
  getNewTwitterStream,
  getTwitterStream
} from './actions/streams';

import './App.css';


/* */

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autoSync: props.autoSync,
    }
  }

  componentDidMount() {
    this.triggerSync();
  }

  triggerSync = () => {
    const { query, fltr, dispatch } = this.props;

    // TODO combine
    dispatch(getTwitterStream(query, fltr));
    dispatch(updateNavQuery(query));
    dispatch(updateNavFilter(fltr));
  }

  handleProgressComplete = () => {
    this.triggerSync();
  }

  handleSearchSubmit = (e, query, fltr) => {
    const { dispatch } = this.props;
    // TODO combine
    dispatch(getNewTwitterStream(query, fltr));
    dispatch(updateNavQuery(query));
  }

  render() {

    const { autoSync } = this.state,
      { dispatch, searches, query, fltr, drawerOpen } = this.props;

    return (
      <main className="App">
        <AppDrawer
          open={drawerOpen}
          dispatch={dispatch}
          savedSearches={searches} />
        <AppNav
          query={query}
          fltr={fltr}
          dispatch={dispatch} />
        <AppSyncProgressBar
          enabled={autoSync}
          onProgressComplete={this.handleProgressComplete} />
        <StatusFeedContainer />
        <AppFooter />
      </main>
    );
  }
}

App.defaultProps = {
  query: null,
  fltr: null,
  autoSync: true
}

export default App;
