import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./redux/reducers/rootReducer";
import {Provider} from "react-redux";
import 'antd/dist/reset.css';
import "./styles/global.scss";
import thunk from "redux-thunk";

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
