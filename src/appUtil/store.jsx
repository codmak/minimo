import React from "react";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../store/reducer';

const store = createStore(rootReducer);
export function applyStore(children) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }