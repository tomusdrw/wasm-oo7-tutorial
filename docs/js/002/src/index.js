import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {TimeBond} from 'oo7';

ReactDOM.render(<App />, document.getElementById('root'));

// Let's try to create the first bond.
let bond = new TimeBond;

// 4/ We tie the bond with a DOM element.
bond.tie(val => {
  console.log('Got notification from a bond.');
  document.querySelector('#oo7').textContent = val;
})
