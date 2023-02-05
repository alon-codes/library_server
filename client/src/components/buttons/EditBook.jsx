import React from "react";
import Button from '@mui/material/Button';

export default (props) => {
    return (
        <Button {...props} className="book-edit" color="default">
            <span className="book-edit-icon mdi mdi-pencil"></span>
            Edit
        </Button>
    )
}