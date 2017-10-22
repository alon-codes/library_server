import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BookItem from './BookItem';

export default class BooksList extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    };

    constructor(props){
        super(props);
        this.state = {
            books: props.books
        };
    }

    render(){

        const elements = this.state.books.map((singleBook) => {

            const {
                author,
                date,
                title
            } = singleBook;

            return (
                <div className="row">
                    <BookItem
                        author={author}
                        title={title}
                        date={date} />
                </div>
            );
        });

        return (
            <div className="container">
                { elements }
            </div>
        );
    }
}