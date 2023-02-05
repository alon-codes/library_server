import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {formatDate} from "../Helpers";
import EditBook from "./buttons/EditBook";
import Typography from '@mui/material/Typography';

const BookItem = ({title, date, author, onEdit}) => {

  const dateStr = formatDate(new Date(date));

  return (
    <Card className="book-item">
      <CardContent>
        <Typography>{title}</Typography>
        <Typography>{author}</Typography>
        <Typography>{dateStr}</Typography>
        <CardActions>
          <EditBook onClick={onEdit} />
        </CardActions>
      </CardContent>
    </Card>
  );
};

BookItem.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default BookItem;