
import React from 'react';
import { inject, observer } from 'mobx-react';
import BookItem from './BookItem';
import Grid from '@mui/material/Grid';

const BooksList = observer(({ store }) => {
    return (
        <Grid container>
            {store?.books?.map(({ title, author, date, ...singleBook }) => (
                <Grid xs={12} md={4} sm={6} item key={Math.random()}>
                    <BookItem
                        onEdit={() => store.editMode(singleBook)}
                        author={author}
                        title={title}
                        date={date} />
                </Grid>
            ))}
        </Grid>
    );
});

export default BooksList;