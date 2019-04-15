import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import BooksList from './BooksList';
import Credit from './Credit';
import {inject, observer} from "mobx-react";
import AddBook from "./buttons/AddBook";
import Header from './Header';
import BookModal from './BookModal';

const theme = createMuiTheme({
    overrides: {
        // Name of the component ⚛️ / style sheet
        MuiButton: {

        }
    },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Header />
                <BooksList />
                <Credit />
                <BookModal />
            </MuiThemeProvider>
        );
    }
}

export default App;