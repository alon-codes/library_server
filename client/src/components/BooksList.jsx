
import React from 'react';
import { observer } from 'mobx-react';
import BookItem from './BookItem';
import Grid from '@mui/material/Grid';

const BooksList = observer(({ store }) => {
    console.log({ books: store.books })
    return (
        <Grid container>
            {store.books.map(({ id, title, author, publication_date, ...singleBook }) => (
                <Grid xs={12} md={4} sm={6} item key={id}>
                    <BookItem
                        onEdit={() => store.editMode(singleBook)}
                        author={author}
                        title={title}
                        date={publication_date} />
                </Grid>
            ))}
        </Grid>
    );
});

export default BooksList;