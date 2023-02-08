import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { formatDate } from "../Helpers";
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Stack from '@mui/material/Stack';

const BookItem = ({ title, date, author, onEdit }) => {

  const dateStr = formatDate(new Date(date));

  return (
    <Card className="book-item">
      <CardContent>
        <Typography textAlign="left" variant="h6">{title}</Typography>
        <Typography textAlign="left" variant="body1">{author}</Typography>
        <Typography textAlign="left" variant="body2">{dateStr}</Typography>
        <CardActions>
          <Stack alignItems="space-between" flexDirection="row">
            <Button fullWidth startIcon={<ModeEditIcon />} onClick={onEdit}>
              Edit
            </Button>
            <Button fullWidth startIcon={<DeleteForeverIcon />} onClick={onEdit}>
              Delete
            </Button>
          </Stack>
          
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default BookItem;