import React, { Component } from 'react';

import StreamContainer from './containers/StreamContainer';

import './App.css';

class App extends Component {
  render() {
    return (
      <main className="App">
        <StreamContainer />
      </main>
    );
  }
}

export default App;
