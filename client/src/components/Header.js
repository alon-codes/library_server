import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

export default class Header extends Component {
    render(){
        return (
            <Grid container>
                <Grid item xs={12}>
                    <h1 id="app-title">Books Shelf</h1>
                </Grid>
            </Grid>
        );
    }
}