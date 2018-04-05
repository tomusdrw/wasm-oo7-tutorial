import React, { Component } from 'react';

import {Rspan} from 'oo7-react';
import {bytesToHex, hexToAscii, formatBalance} from 'oo7-parity';

class Contract extends Component {
  render() {
    console.log(this.props.contract);

    return (
      <div style={styles}>
        <h3>WASM contract details</h3>
        <p>
          Contract has been deployed at <strong>
            <Rspan>{this.props.contract.block_hash().map(bytesToHex)}</Rspan>
          </strong>
        </p>
        <hr />
        <h3>Messages</h3>
        {/* We are collecting all the logs and displaying them */}
        <Rspan>{ this.props.contract.Message().map(x => x.map((x, idx) => <Message key={idx} {...x} />)) }</Rspan>
      </div>
    );
  }
}

// 7/ A sub-component used to render the messages.
function Message({value, data, indexed_from}) {
  return (
    <div>
      {indexed_from} said {hexToAscii(data)} and sent {formatBalance(value)}
    </div>
  )
}

const styles = {
  textAlign: 'left',
  width: '70%',
  padding: '3rem',
  border: '1px solid #444',
  margin: '1rem auto'
}

export default Contract;
