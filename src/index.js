import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  wrapComponent,
  applyLanguage,
  applyStore,
  applyRouter
} from './appUtil';

import 'antd/dist/antd.css';
import './scss/index.scss';

ReactDOM.render(
  wrapComponent(<App />, [
    applyStore,
    applyRouter('hash'),
    applyLanguage('zh_cn')
  ]),
  document.getElementById('root')
);
