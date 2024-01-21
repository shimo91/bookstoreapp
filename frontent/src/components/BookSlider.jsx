import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const bookData = [
  // {
  //   title: 'Book 1',
  //   author: 'Author 1',
  //   imageUrl: 'https://www.indesprocom.com/wp-content/uploads/2017/09/book-slider.jpg',
  // },
  // {
  //   imageUrl: process.env.PUBLIC_URL + '/slider/slider1.jpg',
  // },
  // {
  //   imageUrl: 'https://m.media-amazon.com/images/S/aplus-media/vc/e90fddcc-2139-42ea-ba03-8ae7cbcc5698.__CR0,0,2910,900_PT0_SX970_V1___.jpg',
  // },
  // // Add more books as needed
  // {
  //   imageUrl: 'https://greenvillejournal.com/wp-content/uploads/2021/12/stack-of-books-in-home-interior-picture-id532852345.jpg',
  // },
  // {
  //   imageUrl: 'https://fromphdtolife.com/wp-content/uploads/2020/09/jessica-ruscello-OQSCtabGkSY-unsplash-1-1024x683.jpg',
  // },
  // {
  //   title: 'Book 1',
  //   author: 'Author 1',
  //   imageUrl: 'https://www.indesprocom.com/wp-content/uploads/2017/09/book-slider.jpg',
  // },
 
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