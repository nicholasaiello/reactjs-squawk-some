import React, { Component } from 'react';

import StatusFeedContainer from './containers/StatusFeedContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <main className="App">
        <nav></nav>
        <StatusFeedContainer />
      </main>
    );
  }
}

export default App;
