import { observable, runInAction, action, transaction } from 'mobx';
import axios from 'axios';
import { SERVER_URL } from "../Config";

class BooksStore {
    books = observable([]);
    isOpen = observable.box(false);
    currentBook = observable.map({});

    constructor(){
        this.getData();
    }

    static sortBooks(b1, b2){
        return b1.id.localeCompare(b2.id);
    }

    /**
     * Making request to the server
     */
    getData = () => {
        axios.get(SERVER_URL + "/books").then(res => {
            if (res.data.hasOwnProperty("result")) {
                transaction(() => {
                    const sortedBooks = res.data.result.sort(BooksStore.sortBooks);
                    this.books.replace(sortedBooks);
                });
            }
        });
    }

    isTitleExists(title, id){
        const sameTitleIndex = this.books.findIndex((b) => {
            return b.title === title && b.id !== id
        });

        return sameTitleIndex < 0;
    }

    editBook = (book) => {
        if(book.id.length === 0)
            return this.addNewBook(book.title, book.publication_date);

        const bookIndex = this.books.findIndex((b) => b.id === book.id);
        transaction(() => {
            this.books[bookIndex] = book;
            this.isOpen = observable(false);
        });
    }

    editMode = (book) => {
        transaction(() => {
            this.isOpen.set(true);
            this.currentBook.replace(book);
            console.log(`Entering book edit mode - see object -`, this.isOpen);
        });
    }

    exitEditMode(){
        this.isOpen.set(false);
    }

    addNewBook(bookTitle, bookDate){
        const booksArrLength = this.books.length;
        const lastBookId = this.books[booksArrLength - 1].id;

        const nBook = {
            id: parseInt(lastBookId) + 1,
            date: bookDate,
            title: bookTitle
        };

        runInAction(() => {
            this.books.replace(this.books.push(nBook));
        });

        this.editMode(nBook);

    }
}

const store = new BooksStore();
window.store = store

export default store;