import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { wrapComponent, applyStore, applyRouter } from './appUtil';

import './scss/index.scss';

ReactDOM.render(
  wrapComponent(<App />, [applyStore, applyRouter('hash')]),
  document.getElementById('root')
);
