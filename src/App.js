import React, { Component } from 'react';

import AppNav from './components/AppNav';
import AppDrawer from './components/AppDrawer';
import AppFooter from './components/AppFooter';

import AppTicker from './components/AppTicker';
import AppSyncProgressBar from './components/AppSyncProgressBar';
import StatusFeedContainer from './containers/StatusFeedContainer';

import {
  getNewTwitterStream
} from './actions/streams';

import './App.css';


/* */

class App extends Component {

  componentDidMount() {
    this.triggerSync();
  }

  triggerSync = () => {
    const { query, fltr, dispatch } = this.props;
    dispatch(getNewTwitterStream(query, fltr));
  }

  handleSearchSubmit = (e, query, fltr) => {
    const { dispatch } = this.props;
    dispatch(getNewTwitterStream(query, fltr));
  }

  render() {

    const {
      dispatch,
      searches,
      meta,
      query,
      fltr,
      progress,
      drawerOpen
    } = this.props;

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
        <AppTicker
          query={searches.query || query}
          {...meta} />
        <AppSyncProgressBar
          progress={progress}
          dispatch={dispatch} />
        <StatusFeedContainer />
        <AppFooter />
      </main>
    );
  }
}

export default App;
