import React from 'react';
import ReactDOM from 'react-dom';
import App, { store } from './App.js';

const render = () => {
  ReactDOM.render(<App {...store.getState()} />, document.getElementById('root'));
}

store.subscribe(render);
render();
