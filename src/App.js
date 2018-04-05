import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Import oo7
import {TimeBond} from 'oo7';
// Import RSpan from oo7-react
import {Rspan} from 'oo7-react';

class App extends Component {
  // Create a new instance of TimeBond
  time = new TimeBond()

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* 3/ Display time inside Rspan */}
        <p>
          <Rspan>{this.time}</Rspan>
        </p>
      </div>
    );
  }
}

export default App;
