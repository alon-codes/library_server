import React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { formatDate, isValidDateStr } from "../Helpers";
import { observer } from "mobx-react";

const BookModal = observer(({ store, classes }) => {
    const [title, setTitle] = useState(store.currentBook.title);
    const [date, setDate] = useState(store.currentBook.publication_date);
    const [titleError, setTitleError] = useState("");
    const [dateError, setDateError] = useState("");

    const save = () => {
        let currentBook = {};

        let isValid = true;

        if (currentBook.title.length <= 0) {
            setTitleError("Title can\'t be empty");
            isValid = false;
        } else if (BooksStore.isTitleExists(currentBook.title)) {
            setTitleError("Title already exists, try another");
            isValid = false;
        }

        if (currentBook.publication_date.length <= 0) {
            setDateError("Date can't be empty")
            isValid = false;
        } else if (!isValidDateStr(currentBook.publication_date)) {
            setDateError("Date is not matching the format dd/mm/yyyy");
            isValid = false;
        }

        if (isValid)
            store.editBook(currentBook);
    };

    const handleTitleChange = React.useCallback((e) => {
        let nVal = e.target.value;

        if (nVal.length === 0)
            nVal = "";

        setTitle(nVal);
    });

    const handleDateChange = e => {
        let nVal = e.currentTarget.value;
        console.log({ nVal });
        setDate(new Date(nVal));
    };

    const close = () => {
        store.exitEditMode();
    };

    const dateStr = !!date ? formatDate(date) : '';

    return (
        <Modal open={store.isOpen.get()}>
            <Grid container>
                <Grid item>
                    Edit book title
                </Grid>
                <input value={title} onChange={handleTitleChange} name="title" id="title" placeholder="Name the book" />
                {titleError.length && (
                    <span>{titleError}</span>
                )}
                <input value={date} onChange={handleDateChange} type="date" id="date" name="date" />
                {dateError.length && (
                    <span>{dateError}</span>
                )}
                <Button onClick={save}>Save</Button>
                <Button onClick={close}>Cancel</Button>
            </Grid>
        </Modal>
    );

});

export default BookModal;