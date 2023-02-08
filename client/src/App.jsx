import React from 'react';
import BooksList from './components/BooksList';
import Credit from './components/Credit';
import Header from './components/Header';
import BookModal from './components/BookModal';
import BooksStore from './stores/BooksStore';
import { observer } from 'mobx-react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const store = new BooksStore();
store.getData();

const App = observer(() => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Header />
            <BooksList store={store} />
            <Credit />
            <BookModal store={store} />
        </LocalizationProvider>
    );
});

export default App;