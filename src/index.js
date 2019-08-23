import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';

import reduxAPI from './middleware/reduxAPI'; // our redux-rest object

const reducer = combineReducers(reduxAPI.reducers);
const store = createStore(
  reducer,
  compose(
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(thunk)
      : applyMiddleware(thunk, createLogger())
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
