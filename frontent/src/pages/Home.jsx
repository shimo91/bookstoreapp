import React from 'react'
import { Container, Typography, Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import BookSlider from '../components/BookSlider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => {
  const [bookData, setbookdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:4000/books/getfeatured/');
            console.log("book data is", response.data);
            setbookdata(response.data);
        } catch (error) {
            console.error("Error fetching book data:", error);
        }
  };

    fetchData();
  }, []); 
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
              <Link to={`/bookDetail/${book._id}`} className='linkStyle'>
              <Card>
                <CardActionArea>
                  {/* <CardMedia
                    component="img"
                    sx={{ width: '150px',
                      margin: 'auto',  // Center horizontally
                      display: 'block', 
                    }}
                    image={book.imageUrl}
                    alt={book.title}
                  /> */}
                  <img src={book.imageUrl} style={{height:'250px',marginTop:'15px'}} alt={book.title}/>
                  <CardContent className='linkStyle'>
                    <Typography component="div" fontSize='6'>
                    {book.title}
                    </Typography>
                    <Typography variant="h7" color="textSecondary">
                      {book.author}
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