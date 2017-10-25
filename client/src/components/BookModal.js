import React, {Component} from 'react';
import { Input, FormGroup, Form, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

import {formatDate, isValidDateStr} from "../Helpers";
import {inject, observer} from "mobx-react";

class BookModal extends Component {
    constructor(props){
        super(props);

        const { BooksStore } = this.props;

        this.state = {
            isOpen: BooksStore.isOpen,
            currentBook: this.props.BooksStore.currentBook,
            errors: this.props.errors,
            titleError: "",
            dateError: ""
        };

        this.save = this.save.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);

        this.setState({
            currentBook: nextProps.BooksStore.currentBook
        });
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
        console.log(this.props.BooksStore.isOpen);

        const {
            titleError,
            dateError
        } = this.state;


        const {
            isOpen
        } = this.props.BooksStore;

        const {
            date,
            title
        } = this.state.currentBook;

        const dateStr = formatDate(new Date(date));

        let titleErrorEle = null;
        let dateErrorEle = null;

        if(titleError.length > 0)
            titleErrorEle = <span>{ titleError }</span>;

        if(dateError.length > 0)
            dateErrorEle = <span>{ dateError }</span>;

        return (
            <Modal isOpen={isOpen.get()}>
                <ModalHeader>Edit book title</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <input value={title} onChange={this.handleTitleChange} name="title" id="title" placeholder="Name the book" />
                            { titleErrorEle }
                        </FormGroup>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <input value={dateStr} onChange={this.handleDateChange} type="text" id="date" name="date" placeholder="dd/mm/yyyy" />
                            { dateErrorEle }
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="alert" onClick={this.save}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.close.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default inject("BooksStore")(observer(BookModal));