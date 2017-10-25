import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button } from "reactstrap";

import BookItem from './BookItem';
import BookModal from './BookModal';
import { isValidDateStr } from "../Helpers";

import {inject, observer} from 'mobx-react';

class BooksList extends Component {
    constructor(props){
        super(props);

        const { BooksStore } = this.props;

        this.state = {
            books: this.props.BooksStore.books
        };

        this.openEditBox = this.openEditBox.bind(this);
        this.handleSingleBook = this.handleSingleBook.bind(this);
    }

    componentWillReceiveProps(props){
        console.log(props);

        this.setState({
            books: props.BooksStore.books.toJS()
        });
    }

    openEditBox(book){
        this.props.BooksStore.editMode(book);
    }

    handleSingleBook(singleBook){
        const {
            author,
            date,
            title
        } = singleBook;

        const dateObj = new Date(date);

        return (
            <div key={Math.random()} className="col-lg-3 col-md-4 col-sm-6">
                <BookItem
                    onEdit={() => this.openEditBox(singleBook)}
                    author={author}
                    title={title}
                    date={date} />
            </div>
        );
    }

    render(){
        const elements = this.state.books.map(this.handleSingleBook);

        return (
            <div className="row">
                { elements }
                <BookModal />
            </div>
        );
    }
}

export default inject("BooksStore")(observer(BooksList));