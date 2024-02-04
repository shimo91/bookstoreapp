import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Card, CardActionArea, CardMedia} from '@mui/material';

const bookData = [
  {
    imageUrl: process.env.PUBLIC_URL + '/slider/slider3.jpg',
  },
  {
    imageUrl: process.env.PUBLIC_URL + '/slider/slider2.jpg',
  },
  {
    imageUrl: process.env.PUBLIC_URL + '/slider/slider4.jpg',
  },
  {
    imageUrl: process.env.PUBLIC_URL + '/slider/slider1.jpg',
  },
];

const BookSlider = () => {
  return (
    <Carousel>
      {bookData.map((book, index) => (
        <Card key={index}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={book.imageUrl}
              alt={book.title}
            />
          </CardActionArea>
        </Card>
      ))}
    </Carousel>
  );
};

export default BookSlider;