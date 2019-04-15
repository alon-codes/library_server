import React from "react";
import Button from '@material-ui/core/Button';

export default (props) => {
    return (
        <Button color="default" onClick={props.addNewBook}>
            <span className="mdi mdi-create"></span>
            Add Book
        </Button>
    )
}