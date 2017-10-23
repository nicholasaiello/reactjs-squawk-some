import React, { Component } from 'react';

import AppNav from './components/AppNav';

import AppSyncProgressBar from './components/AppSyncProgressBar';
import StatusFeedContainer from './containers/StatusFeedContainer';

import {
  getNewTickerStream,
  getTickersStream,
  filterFeed
} from './actions/streams';

import './App.css';

/**
 * App page layout components
 * TODO: break-up
 */

const AppDrawer = ({ open, onOpenToggle }) => {

  return (
    <aside className={open ? "open" : ''} onClick={onOpenToggle}>
      <ul>
        <li>adding stuff here soon</li>
      </ul>
    </aside>
  );

};

const AppFooter = () => {

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
      query: props.query || window.localStorage.getItem('_lastQuery') || '',
      fltr: props.fltr || '',
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

    dispatch(getTickersStream(query));
  }

  handleDrawerToggle = () => {
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  handleProgressComplete = () => {
    this.triggerSync();
  }

  handleSearchChange = (e, value) => {
    this.setState({ query: value });
  }

  handleSearchSubmit = (e, query, fltr) => {
    this.props.dispatch(getNewTickerStream(query, fltr));
  }

  handleSearchFilterChange = (e, value) => {
    console.log(e, value)
    this.setState({ fltr: value });
    this.props.dispatch( filterFeed(value) );
  }

  render() {

    const { query, fltr, autoSync, drawerOpen } = this.state;

    return (
      <main className="App">
        <AppDrawer
          open={drawerOpen}
          onOpenToggle={this.handleDrawerToggle} />
        <AppNav
          query={query}
          fltr={fltr}
          onNavToggle={this.handleDrawerToggle}
          onSearchChange={this.handleSearchChange}
          onSubmit={this.handleSearchSubmit}
          onFilterChange={this.handleSearchFilterChange} />
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
