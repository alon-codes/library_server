import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import {formatDate, isValidDateStr} from "../Helpers";
import {inject, observer} from "mobx-react";
import { Paper } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 100,
        height: 500,
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        paddingLeft: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 4,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class BookModal extends Component {
    constructor(props){
        super(props);

        const { BooksStore } = this.props;

        this.state = {
            isOpen: false,
            currentBook: null,
            errors: this.props.errors,
            titleError: "",
            dateError: ""
        };

        this.save = this.save.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        let nextState = {};
        const { BooksStore } = nextProps;
        
        // Extract value from the observable
        const isOpen = BooksStore.isOpen.get();
        const currentBook = BooksStore.currentBook.get();

        if(isOpen !== prevState.isOpen){
            nextState.isOpen = isOpen;
        }

        if(currentBook !== prevState.currentBook){
            nextState.currentBook = currentBook;
        }

        return nextState;
    }

    save(){

        const { currentBook } = this.state;
        const { BooksStore } = this.props;

        let isValid = true;

        if(currentBook.title.length <= 0) {
            this.setState(prevState => {
                prevState.titleError = "Title can't be empty"
            });
            isValid = false;
        } else if(BooksStore.isTitleExists(currentBook.title)){
            this.setState(prevState => {
                prevState.titleError = "Title already exists, try another"
            });
            isValid = false;
        }

        if(currentBook.date.length <= 0){
            this.setState(prevState => {
                prevState.dateError = "Date can't be empty"
            });
            isValid = false;
        } else if(!isValidDateStr(currentBook.date)) {
            this.setState(prevState => {
                prevState.dateError = "Date is not matching the format dd/mm/yyyy"
            });
            isValid = false;
        }

        if(isValid)
            BooksStore.editBook(currentBook);
    }

    handleTitleChange(e){
        let nVal = e.target.value;

        if(nVal.length === 0)
            nVal = "";

        this.setState(prevState => prevState.currentBook.title = nVal);
    }

    handleDateChange(e){
        let nVal = e.target.value;

        if(nVal.length === 0)
            nVal = "";

        this.setState(prevState => prevState.currentBook.date = nVal);
    }

    close(){
        this.props.BooksStore.exitEditMode();
    }

    render(){

        console.log(`Modal received store props`,this.props.BooksStore);
        const {
            titleError,
            dateError,
            isOpen,
            currentBook = { date: new Date(), title: "" }
        } = this.state;

        const { date,title } = this.state.currentBook;

        const dateStr = formatDate(date);

        let titleErrorEle = null;
        let dateErrorEle = null;

        if(titleError.length > 0)
            titleErrorEle = <span>{ titleError }</span>;

        if(dateError.length > 0)
            dateErrorEle = <span>{ dateError }</span>;

        console.log(`Modal opening status: ${isOpen}`);

        return (
            <Modal open={isOpen}>
                <div style={getModalStyle()} className={this.props.classes.paper}>
                    <Grid container>
                        <Grid item>
                            Edit book title
                        </Grid>                    
                        <input value={title} onChange={this.handleTitleChange} name="title" id="title" placeholder="Name the book" />
                        { titleErrorEle }
                        <input value={dateStr} onChange={this.handleDateChange} type="text" id="date" name="date" placeholder="dd/mm/yyyy" />
                        { dateErrorEle }
                        <Button onClick={this.save}>Save</Button>{' '}
                        <Button onClick={this.close.bind(this)}>Cancel</Button>
                    </Grid>
                </div>
            </Modal>
        );
    }
}

const modalWithStore = inject("BooksStore")(observer(BookModal));
export default withStyles(styles)(modalWithStore);