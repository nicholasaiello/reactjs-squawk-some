import React, { Component } from 'react';

import { DEFAULT_SYNC_INTERVAL } from './constants/Env';

import AppSyncProgressBar from './components/AppSyncProgressBar';
import StatusFeedContainer from './containers/StatusFeedContainer';

import {
  getNewTickerStream,
  getTickersStream
} from './actions/streams';

import './App.css';

/**
 * App page layout components
 * TODO: break-up
 */

const AppNav = ({ query, onNavToggle, onSearchSubmit }) => {
  return (
    <nav>
      <button className="nav-btn" onClick={onNavToggle}></button>
      <form onSubmit={onSearchSubmit}>
        <input type="search" name="srch" placeholder="search for something..." /> ->
        <input type="text" name="fltr" placeholder="filter results..." />
        <input type="submit" style={{ display: "none" }} />
      </form>
    </nav>
  );
};

const AppDrawer = ({ open, onOpenToggle }) => {

  return (
    <aside className={open ? "open" : ''} onClick={onOpenToggle}>
      <ul>

      </ul>
    </aside>
  );

};

const AppFooter = ({  }) => {

  const year = (new Date()).getFullYear();

  return (
    <footer>
      <p>
        <small>&copy; copyright nicholas aiello {year}. all rights reserved.</small>
      </p>
    </footer>
  );

};

/* */

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
      autoSync: props.autoSync,
      drawerOpen: false
    }
  }

  componentDidMount() {
    this.triggerSync();
  }

  triggerSync = () => {
    const { dispatch } = this.props,
      { query } = this.state;

    dispatch(
      // TODO clean-up
      getTickersStream(query || window.localStorage.getItem('_lastQuery'))
    );
  }

  handleDrawerToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  handleProgressComplete = () => {
    this.triggerSync();
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props,
      form = e.target,
      query = form.srch.value,
      fltr = form.fltr.value;

    // TODO clean-up
    window.localStorage.setItem('_lastQuery', query);

    if (query) {
      dispatch(getNewTickerStream(query, fltr));
    }
  }

  render() {

    const { query, autoSync, drawerOpen } = this.state;

    return (
      <main className="App">
        <AppDrawer
          open={drawerOpen}
          onOpenToggle={this.handleDrawerToggle} />
        <AppNav
          query={query}
          onNavToggle={this.handleDrawerToggle}
          onSearchSubmit={this.handleSearchSubmit} />
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
  autoSync: true
}

export default App;
