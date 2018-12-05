import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.css';
import App from './container/App';
import bind, {useHash, useZhCn} from './bind/';

ReactDOM.render(bind(<App/>, [useHash, useZhCn]), document.getElementById('root'));
