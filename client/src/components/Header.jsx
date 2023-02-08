import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Header = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography textAlign="center" variant="h5">Books Shelf</Typography>
            </Grid>
        </Grid>
    );
};

export default Header;