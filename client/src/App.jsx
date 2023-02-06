import React from 'react';
import BooksList from './components/BooksList';
import Credit from './components/Credit';
import Header from './components/Header';
import BookModal from './components/BookModal';
import BooksStore from './stores/BooksStore';
import { observer } from 'mobx-react';

const store = new BooksStore();
store.getData();

const App = observer(() => {
    return (
        <>
            <Header />
            <BooksList store={store} />
            <Credit />
            <BookModal store={store} />
        </>
    );
});

export default App;