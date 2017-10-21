import React, { Component } from 'react';

import { DEFAULT_SYNC_INTERVAL } from './constants/Env';

import AppSyncProgressBar from './components/AppSyncProgressBar';
import StatusFeedContainer from './containers/StatusFeedContainer';

import {
  getNewTickerStream,
  getTickersStream
} from './actions/streams';

import './App.css';

const AppNav = ({ query, onSearchSubmit }) => {
  return (
    <nav>
      <form onSubmit={onSearchSubmit}>
        <input type="search" name="srch" placeholder="search for something..." /> ->
        <input type="text" name="fltr" placeholder="filter results..." />
        <input type="submit" style={{ display: "none" }} />
      </form>
    </nav>
  );
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
      autoSync: props.autoSync
    }
  }

  componentDidMount() {
    this.triggerSync();
  }

  triggerSync = () => {
    const { dispatch } = this.props,
      { query } = this.state;

    dispatch(
      getTickersStream(query || window.localStorage.getItem('_lastQuery'))
    );
  }

  handleProgressComplete = () => {
    this.triggerSync();
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props,
      form = e.target,
      query = form.srch.value,
      filter = form.fltr.value;

    // TODO clean-up
    window.localStorage.setItem('_lastQuery', query);

    if (query) {
      dispatch(getNewTickerStream(query));
    }
  }

  render() {

    const { query, autoSync } = this.state;

    return (
      <main className="App">
        <AppNav
          query={query}
          onSearchSubmit={this.handleSearchSubmit} />
        <AppSyncProgressBar
          enabled={autoSync}
          onProgressComplete={this.handleProgressComplete} />
        <StatusFeedContainer />
      </main>
    );
  }
}

App.defaultProps = {
  query: null,
  autoSync: true
}

export default App;
