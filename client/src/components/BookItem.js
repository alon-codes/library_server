import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class BookItem extends Component {

    propTypes = {
        author: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date),
        title: PropTypes.string.isRequired
    };

    render(){

        const { title, date, author } = this.props;
        // TODO: convert date object to pretty string
        const dateStr = "22/10/2017";

        return (
            <div className="row">
                <div className="col-xs-4">{title}</div>
                <div className="col-xs-4">{dateStr}</div>
                <div className="col-xs-4">{author}</div>
            </div>
        )
    }
}