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

const AppTicker = ({ symbol, price, open, volume, refreshed }) => {

  if (!symbol) {
    return (
      <div className="ticker">
        <em>loading...</em>
      </div>
    );
  }

  return (
    <div className="ticker">
      <h4>{symbol.toUpperCase()}</h4>
      <figure>
        <label>last tick:</label>
        <figcaption>
          ${parseFloat(price).toLocaleString('en')}
        </figcaption>
      </figure>
      <figure>
        <label>open:</label>
        <figcaption>
          ${parseFloat(open).toLocaleString('en')}
        </figcaption>
      </figure>
      <figure>
        <label>volume:</label>
        <figcaption>
          {parseInt(volume).toLocaleString('en')}
        </figcaption>
      </figure>
      <figure>
        <label>updated:</label>
        <figcaption>
          {new Date(refreshed).toLocaleDateString()}
        </figcaption>
      </figure>
    </div>
  );

};

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
    dispatch(getNewTwitterStream(query, fltr));
    dispatch(updateNavQuery(query));
    dispatch(updateNavFilter(fltr));
  }

  handleProgressComplete = () => {
    this.triggerSync();
  }

  handleSearchSubmit = (e, query, fltr) => {
    const { dispatch } = this.props;

    // combine
    dispatch(getNewTwitterStream(query, fltr));
    dispatch(updateNavQuery(query));
    dispatch(updateNavFilter(''));
  }

  render() {

    const { autoSync } = this.state,
      { dispatch, searches, query, fltr, meta, drawerOpen } = this.props;

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
        <AppTicker {...meta} />
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
