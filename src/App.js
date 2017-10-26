import React, { Component } from 'react';

import AppNav from './components/AppNav';
import AppDrawer from './components/AppDrawer';
import AppFooter from './components/AppFooter';

import AppTicker from './components/AppTicker';
import AppSyncProgressBar from './components/AppSyncProgressBar';
import StatusFeedContainer from './containers/StatusFeedContainer';

import {
  updateNavQuery,
  updateNavFilter
} from './actions/nav';
import {
  getTwitterStream,
  getNewTwitterStream
} from './actions/streams';

import './App.css';


/* */

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.triggerSync();
  }

  triggerSync = () => {
    const { query, fltr, dispatch } = this.props;
    // TODO combine
    dispatch(getNewTwitterStream(query));
    dispatch(updateNavQuery(query));
    dispatch(updateNavFilter(fltr));
  }

  handleSearchSubmit = (e, query, fltr) => {
    const { dispatch } = this.props;

    // combine
    dispatch(getNewTwitterStream(query));
    dispatch(updateNavQuery(query));
    dispatch(updateNavFilter(fltr));
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
        <AppTicker query={query} {...meta} />
        <AppSyncProgressBar
          progress={progress}
          dispatch={dispatch} />
        <StatusFeedContainer />
        <AppFooter />
      </main>
    );
  }
}

App.defaultProps = {
  query: null,
  fltr: null
}

export default App;
