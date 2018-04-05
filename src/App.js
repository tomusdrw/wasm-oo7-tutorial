import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Rspan} from 'oo7-react';
import {bonds, formatBalance, formatBlockNumber} from 'oo7-parity';
import contractAbi from './abi.json';

// Displaying a contract data has been moved to a separate component
import Contract from './Contract';

class App extends Component {

  contract = bonds.makeContract(
    '0x4C801a31573e6B726fA02D6d8958C77203694FE2',
    contractAbi
  )

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Parity Dapp</h1>
        </header>
        <p>
          <Rspan>{bonds.me}</Rspan> has <strong><Rspan>
            {bonds.balance(bonds.me).map(formatBalance)}
          </Rspan></strong> at <strong><Rspan>
              {bonds.height.map(formatBlockNumber)}
          </Rspan></strong>
        </p>

        {/* We pass the contract instance in props. */}
        <Contract contract={this.contract} />
      </div>
    );
  }
}

export default App;
