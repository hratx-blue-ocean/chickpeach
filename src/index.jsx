import React from 'react';
import ReactDOM from 'react-dom';
import Root from'./router.jsx';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import allReducers from './components/reducers'
//if you have a theme library, import it here

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
document.getElementById('root'));