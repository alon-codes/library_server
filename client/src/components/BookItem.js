import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';
import {formatDate} from "../Helpers";
import EditBook from "./buttons/EditBook";

export default class BookItem extends Component {

    static propTypes = {
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onEdit: PropTypes.func.isRequired
    };

    render(){

        const { title, date, author, onEdit } = this.props;
        // TODO: convert date object to pretty string
        const dateStr = formatDate(new Date(date));

        return (
            <Card className="book-item">
                <CardBody>
                    <CardTitle className="book-title">{title}</CardTitle>
                    <CardSubtitle className="book-author">{author}</CardSubtitle>
                    <CardText className="book-data">{dateStr}</CardText>
                    <EditBook onClick={onEdit} />
                </CardBody>
            </Card>
        )
    }
}