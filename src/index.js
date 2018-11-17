import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rest from "./rest"; //our redux-rest object

const reducer = combineReducers(rest.reducers);
const store = createStore(
    reducer,
    compose(
        process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : applyMiddleware(thunk, createLogger()),
    ),
  );

ReactDOM.render((<Provider store={store}><App /></Provider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
