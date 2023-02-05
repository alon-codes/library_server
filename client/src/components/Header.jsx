import React from 'react';
import Grid from '@mui/material/Grid';

const Header = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <h1 id="app-title">Books Shelf</h1>
            </Grid>
        </Grid>
    );
};

export default Header;