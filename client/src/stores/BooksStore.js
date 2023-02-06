import { observable, runInAction, transaction } from 'mobx';
import axios from 'axios';
import { SERVER_URL } from "../Config";
import { makeAutoObservable } from "mobx"

class BooksStore {
    books = observable([]);
    isOpen = observable.box(false);
    currentBook = observable.map({
        title: "",
        id: ""
    });

    constructor(){
        makeAutoObservable(this);
    }

    static sortBooks(b1, b2){
        return b1.id.localeCompare(b2.id);
    }

    /**
     * Making request to the server
     */
    getData = () => {
        axios.get(SERVER_URL + "/books").then(res => {
            if (!!res.data && !!res.data.length) {
                this.books.replace(res.data);
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
        if(book.id.length === 0){
            this.createBook(book);
        } else {
            const bookIndex = this.books.findIndex((b) => b.id === book.id);
            transaction(() => {
                this.books[bookIndex] = book;
                this.isOpen = observable(false);
            });
        }
    }

    editMode = (book) => {
        this.isOpen.set(true);
        this.currentBook.replace(book);
        console.log(`Entering book edit mode - see object -`, this.isOpen);
    }

    exitEditMode(){
        this.isOpen.set(false);
    }

    createBook(bookTitle, bookDate){
        const booksArrLength = this.books.length;
        const lastBookId = this.books[booksArrLength - 1].id;

        const nBook = {
            id: parseInt(lastBookId) + 1,
            date: bookDate,
            title: bookTitle
        };

        

        this.editMode(nBook);

        axios.post(SERVER_URL + "/books", { bookTitle, bookDate,  }).then(res => {
            if (!!res.data && !!res.data.length) {
                runInAction(() => {
                    this.books.replace(this.books.push(res.data));
                });
            }
        });
    }
}

export default BooksStore;