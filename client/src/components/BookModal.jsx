import React from 'react';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { formatDate, isValidDateStr } from "../Helpers";
import { observer } from "mobx-react";

const getModalStyle = theme => ({
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
});


const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing(100),
        height: 500,
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
});

const BookModal = observer(({ store, classes }) => {
    const [ isOpen = false, setOpened ] = useState(store?.isOpen?.get());
    const [ title, setTitle ] = useState("");
    const [ date, setDate ] = useState("");
    const [ titleError, setTitleError ] = useState("");
    const [ dateError, setDateError ] = useState("");

    const save = () => {
        const { currentBook } = state;

        let isValid = true;

        if (currentBook.title.length <= 0) {
            setState(prevState => ({
                ...prevState,
                titleError: "Title can't be empty"
            }));
            isValid = false;
        } else if (BooksStore.isTitleExists(currentBook.title)) {
            setState(prevState => ({
                ...prevState,
                titleError: "Title already exists, try another"
            }));
            isValid = false;
        }

        if (currentBook.publication_date.length <= 0) {
            setState(prevState => ({
                ...prevState,
                dateError: "Date can't be empty"
            }));
            isValid = false;
        } else if (!isValidDateStr(currentBook.publication_date)) {
            setState(prevState => ({
                ...prevState,
                dateError: "Date is not matching the format dd/mm/yyyy"
            }));
            isValid = false;
        }

        if (isValid)
            BooksStore.editBook(currentBook);
    };

    const handleTitleChange = React.useCallback((e) => {
        let nVal = e.target.value;

        if (nVal.length === 0)
            nVal = "";

        setTitle(nVal);
    });

    const handleDateChange = e => {
        let nVal = e.target.value;

        if (nVal.length === 0)
            nVal = "";

        setDate(nVal);
    };

    const close = () => {
        BooksStore.exitEditMode();
    };

    const dateStr = !!date ? formatDate(date) : ''; 

    return (
        <Modal open={isOpen}>
            <div style={getModalStyle()}>
                <Grid container>
                    <Grid item>
                        Edit book title
                    </Grid>
                    <input value={title} onChange={handleTitleChange} name="title" id="title" placeholder="Name the book" />
                    {titleError.length && (
                        <span>{titleError}</span>
                    )}
                    <input value={dateStr} onChange={handleDateChange} type="text" id="date" name="date" placeholder="dd/mm/yyyy" />
                    {dateError.length && (
                        <span>{dateError}</span>
                    )}
                    <Button onClick={save}>Save</Button>{' '}
                    <Button onClick={close}>Cancel</Button>
                </Grid>
            </div>
        </Modal>
    );

});

export default BookModal;