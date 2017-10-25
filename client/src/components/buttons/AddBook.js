import React from "react";
import {Button} from "reactstrap";

export default (props) => {
    return (
        <Button color="default" onClick={this.addNewBook}>
            <span className="mdi mdi-create"></span>
            Add Book
        </Button>
    )
}