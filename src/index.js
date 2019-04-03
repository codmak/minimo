import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { wrapComponent, applyRouter } from './appUtil';

import './scss/index.scss';

ReactDOM.render(
  wrapComponent(<App />, [applyRouter('hash')]),
  document.getElementById('root')
);
