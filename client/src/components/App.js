import React, { Component } from 'react';
import BooksList from './BooksList';
import Credit from './Credit';
import {inject, observer} from "mobx-react";
import AddBook from "./buttons/AddBook";

class App extends Component {

    addBook(){
        this.props.BooksStore.editBook({
            bookId: "",
            title: "",
            date: new Date()
        });
    }

    render() {
        return (
            <div id="app-container" className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <h1 id="app-title">Books Shelf</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-5"></div>
                    <div className="col-sm-2">
                        <img id="books-picture" src="images/books.jpg" alt="" />
                    </div>
                    <div className="col-sm-5"></div>
                </div>
                <AddBook onClick={this.addBook.bind(this)} />
                <BooksList />
                <Credit />
            </div>
        );
    }
}

export default inject("BooksStore")(observer(App));