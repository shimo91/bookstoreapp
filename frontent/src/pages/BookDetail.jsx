import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Container, Modal } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../axiosinterceptor';
import axios from 'axios';
import StyledModal from '../userDashboard/RequestForm';


const BookDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [book, setData] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:4000/books/bookDetail/' + id).then((res) => {
      setData(res.data);
      //console.log("list of discussion : "+res.data);
    })
  }, []);

  const token = sessionStorage.getItem("userToken");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if the token exists and set the initial state
    setIsUserLoggedIn(!!token);
  }, [token]); // Dependency on token ensures it runs only when token changes

  const handleButtonClick = () => {
    if (isUserLoggedIn) {
      // User is logged in, open the modal with the form
      setIsModalOpen(true);
    } else {
      // User is not logged in, redirect to the login page
      navigate('/login');
    }
  };

  const handleModalClose = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <Grid container sx={{ minHeight: '78vh', marginBottom: '30px' }} component={Paper} elevation={6} square>
      <CssBaseline />
      <Grid item
        xs={false}
        sm={4}
        md={4}
      >
        <Box
          className="imageBox"
        >
          <img src={book.imageUrl} />
        </Box>

      </Grid>
      <Grid item xs={12} sm={8} md={8} >
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {book.title}
            <br />
            {book.subtitle}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <p>Author : {book.author}</p>
            <p>published : {book.published_on}</p>
            <p>Genre: {book.genre}</p>
            <p>ISBN: {book.isbn_number}</p>
            <p>Languages: {book.languages}</p>
            <p>Rental Period: {book.rental_period}</p>
            <p
  variant="contained"
  style={{ marginTop: 3, marginBottom: 2, color: (book.available) ? "#1EB85A" : "#FF0000" }}
>
  {book.available ? "Available" : "Not available"}
</p>
            {(book.available) ?
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleButtonClick}
              >
                Rent Request
              </Button>
              : null}
          </Box>
        </Box>
      </Grid>

      {/* Render the StyledModal component */}
      <StyledModal isOpen={isModalOpen} handleClose={handleModalClose} bookData={book._id} />
      <Container width="lg">
        <Grid item
          xs={false}
          sm={12}
          md={12}
        >
          <p className='alignJustify'>{book.description}</p>
        </Grid>
      </Container>
      <Container width="lg">
        <Grid item
          xs={false}
          sm={12}
          md={12}
          textAlign="left"
        >
          <Typography variant="h6" textAlign="left">Customer Reviews</Typography>
          <p>There are 0 reviews</p>
        </Grid>
      </Container>
      <Container width="lg" >
        <Grid item
          xs={false}
          sm={12}
          md={12}
          textAlign="left"
        >
          <Typography variant="h6" textAlign="left">Review this book</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >Write a review</Button>
        </Grid>
      </Container>
    </Grid>

  )
}

export default BookDetail