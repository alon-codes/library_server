import React from 'react';
import ReactDOM from 'react-dom';

// Loads bootstrap css
import 'bootstrap/dist/css/bootstrap.css';

import "./App.css";

import App from './components/App';
import { Provider } from "mobx-react";
import BooksStore from "./stores/BooksStore";

const stores = {
    BooksStore
};

ReactDOM.render((
    <Provider {...stores}>
        <App />
    </Provider>
), document.getElementById('root'));