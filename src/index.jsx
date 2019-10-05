import React from 'react';
import ReactDOM from 'react-dom';
import Root from'./router.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import allReducers from './components/reducers'
import { loadState, saveState } from '../localStorage.js'

const persistedState = loadState();
const store = createStore(
  allReducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
document.getElementById('root'));