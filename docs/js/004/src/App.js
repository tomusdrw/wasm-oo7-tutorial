import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Rspan} from 'oo7-react';
import {bonds, formatBalance, formatBlockNumber} from 'oo7-parity';

class App extends Component {
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
        {/* 7/ Display default account, it's balance and block number */}
        <p>
          <Rspan>{bonds.me}</Rspan> has <strong><Rspan>
            {bonds.balance(bonds.me).map(formatBalance)}
          </Rspan></strong> at <strong><Rspan>
              {bonds.height.map(formatBlockNumber)}
          </Rspan></strong>
        </p>
      </div>
    );
  }
}

export default App;
