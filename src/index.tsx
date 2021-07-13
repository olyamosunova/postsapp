import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import {Operations as DataOperations} from './store/data/data';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

// @ts-ignore
store.dispatch(DataOperations.loadPosts());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
