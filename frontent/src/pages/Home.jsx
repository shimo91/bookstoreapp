import React from 'react'
import { Container, Typography, Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import BookSlider from '../components/BookSlider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const bookData = [
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover1.jpg',
    id:1
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover2.jpg',
    id:2
  },
 
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover3.jpg',
    id:3
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover4.jpg',
    id:4
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover5.jpg',
    id:5
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover6.jpg',
    id:6
  },
 
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover7.jpg',
    id:7
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover8.jpg',
    id:8
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover9.jpg',
    id:9
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover11.jpg',
    id:10
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover12.jpg',
    id:11
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover13.jpg',
    id:12
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover14.jpg',
    id:13
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover15.jpg',
    id:14
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover16.jpg',
    id:15
  },
 
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover17.jpg',
    id:16
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover18.jpg',
    id:17
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover19.jpg',
    id:18
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover20.jpg',
    id:19
  },
  {
    title: 'Book 1',
    author: 'Author 1',
    imageUrl: process.env.PUBLIC_URL + '/cover/cover10.jpg',
    id:20
  },
 
];
const Home = () => {
  return (
    <Container maxWidth="false" sx={{ padding: '0px!important' }}>
      <Navbar/>
        <BookSlider/>
      <section>
        <Typography variant="h2" gutterBottom sx={{mt:'30px'}}>
          Featured Books
        </Typography>
        <Grid container spacing={3} paddingRight={20} paddingLeft={20} paddingBottom={10}>
          {/* Featured books cards go here */}
          {bookData.map((book, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Link to={`/bookDetail?${book.id}`} className='linkStyle'>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ width: '150px',
                      margin: 'auto',  // Center horizontally
                      display: 'block', 
                    }}
                    image={book.imageUrl}
                    alt={book.title}
                  />
                  <CardContent className='linkStyle'>
                    <Typography variant="h6" component="div">
                    {book.title}
                    </Typography>
                    <Typography color="textSecondary">
                      Author Name
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </section>
      <Footer/>
    </Container>
  );
};


export default Home