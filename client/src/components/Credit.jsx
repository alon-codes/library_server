import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
const credits = (props) => {
    return (
        <Container>
            <Typography variant="body2">
                Created by <a href="https://github.com/alon-codes">Alon Dubov</a>
            </Typography>

            <Typography variant="body2">
                Books data provided by Google Books API
            </Typography>
        </Container>
    );
};

export default credits;