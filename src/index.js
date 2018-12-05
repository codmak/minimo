import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';

import bind, {applyLanguage} from './bind/';
import applyStore from './store';
import applyRouter from './router';

import "antd/dist/antd.css";
import './scss/index.scss';

ReactDOM.render(
  bind(<App/>, [applyStore, applyRouter('hash'), applyLanguage('zh_cn')]),
  document.getElementById('root')
);
