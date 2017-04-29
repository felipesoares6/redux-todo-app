import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducers/index';
import App from './App.js';

ReactDOM.render(
  <Provider store={createStore(appReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
