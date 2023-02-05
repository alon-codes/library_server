import React from 'react';
import BooksList from './components/BooksList';
import Credit from './components/Credit';
import Header from './components/Header';
import BookModal from './components/BookModal';

const App = () => {
    return (
        <>
            <Header />
            <BooksList />
            <Credit />
            <BookModal />
        </>
    );
};

export default App;