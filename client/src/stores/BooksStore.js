import { observable, runInAction, transaction } from 'mobx';
import axios from 'axios';
import { SERVER_URL } from "../Config";
import { makeAutoObservable } from "mobx"
import { getBooks } from '../Api';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import {updateBook, deleteBook} from '../Api';

const DEFAULT_BOOK = {
    id: "",
    title: "",
    author: "",
    publication_date: new Date()
};

class BooksStore {
    
    books = observable([]);
    
    isOpen = observable.box(false);

    currentBook = observable(DEFAULT_BOOK, {deep: true});

    constructor(){
        makeAutoObservable(this);
    }

    static sortBooks(b1, b2){
        return b1.id.localeCompare(b2.id);
    }

    /**
     * Making request to the server
     */
    async getData(){
        try {
            const result = await getBooks();
            if(!!result?.data?.length){
                runInAction(() => {
                    this.books.replace(result.data.map((currenBook) => ({
                        ...currenBook,
                        publication_date: parseISO(currenBook.publication_date)
                    })));
                });
            }
        }
        catch(e){
            console.error("Store::getData", { e })
        }
    }

    async saveBook(draft){
        if(draft?.id?.length === 0){
            this.createBook(draft);
        } else {
            const bookIndex = this.books.findIndex((b) => b.id === draft.id);
            transaction(() => {
                const prev = [...this.books];
                console.log({ prev, draft });
                prev[bookIndex] = draft;
                this.books = prev;
                
            });
            await updateBook(draft);
        }

        runInAction(() => {
            this.isOpen.set(false);
        });
    }

    editMode = (id) => {
        transaction(() => {
            const b = this.books.find(book => book.id === id);
            console.log({ b });
            this.currentBook = {...this.currentBook, ...b};

            this.isOpen.set(true);
            console.log(`Entering book edit mode - see object -`, this.isOpen);
        });
    }

    async deleteBook(id){
        this.books.replace(this.books.filter(curBook => curBook.id !== id));
        await deleteBook(id);
    }

    async createBook(bookObj){
        const res = await axios.post(SERVER_URL + "/books", { ...bookObj, id: undefined });
        if (!!res.data) {
            runInAction(() => {
                this.books = [
                    ...this.books,
                    { ...res.data, publication_date: parseISO(res.data.publication_date) }
                ];
            });
        }
    }

    newBook = () => {
        transaction(() => {
            this.currentBook = {...DEFAULT_BOOK};
            this.isOpen.set(true);
        });
    }
}

export default BooksStore;