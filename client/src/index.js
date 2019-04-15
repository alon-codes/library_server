import React from 'react';
import ReactDOM from 'react-dom';

import "./App.css";

import App from './components/App';
import { Provider } from "mobx-react";
import BooksStore from "./stores/BooksStore";

ReactDOM.render((
    <Provider BooksStore={BooksStore}>
        <App />
    </Provider>
), document.getElementById('root'));