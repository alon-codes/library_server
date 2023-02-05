import { createRoot } from 'react-dom/client';
import "./App.css";

import App from './App';
import BooksStore from "./stores/BooksStore";

const root = createRoot(document.getElementById('root'));
root.render((
    <App />
));