import React from "react";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducer';

const store = createStore(rootReducer);

export default function applyStore(children) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
