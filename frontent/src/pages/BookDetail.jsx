import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Avatar, Container, Divider, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import StyledModal from '../userDashboard/RequestForm';
import CustomPagination from '../components/CustomPagination';
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "../axiosinterceptor"
import { ToastContainer, toast } from "react-toastify";
import { arrayBufferToBase64 } from '../utils';
import SimilarBooks from '../components/SimilarBooks';

const BookDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [book, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [userid, setUserId] = useState('');
  const [content, setContent] = useState('');
  const [reviewlist, setreviewlist] = useState([]);
  const [rentuserlist, setRentUserlist] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [refresh, setRefresh] = useState(false); // State variable to trigger refresh
  const [similarBooks,setSimilarBooks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:4000/books/bookDetail/' + id).then((res) => {
      setData(res.data);
      // console.log("list of rentuserid : ",res.data.rentUser);
      setreviewlist(res.data.reviews)
      setRentUserlist(res.data.rentUser.map(user => user.userid));
      setContent(''); // Reset the review field value after refresh
      // Fetch similar books based on the genre
      if (res.data.genre) {
        axios.get(`http://127.0.0.1:4000/books/similarBooks?genre=${res.data.genre}&currentBookId=${res.data._id}`)
          .then((similarBooksRes) => {
            // Handle the similar books data
            console.log('Similar Books:', similarBooksRes.data);
            setSimilarBooks(similarBooksRes.data)
          })
          .catch((error) => {
            console.error('Error fetching similar books:', error);
          });
      }
    })
  }, [id, refresh]);


  const token = sessionStorage.getItem("userToken");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      var decodeToken = jwtDecode(token);
      //console.log("decode",decodeToken)
      setUserId(decodeToken.userid);
      setUsername(decodeToken.name);
      console.log("rentuserlist", rentuserlist);
      if (rentuserlist.includes(userid)) {
        const user = book.rentUser.find((user) => user.userid === userid);

        if (user && user.deliveryStatus) {
          setCanReview(true);
          console.log(`User ${userid} has rented this book. ${canReview}`);
        } else {
          console.log(`User ${userid} is not in the rentUser array.`);
        }

      }
    }
  }, [token, id, book.rentUser, rentuserlist, canReview]); // Dependency on token ensures it runs only when token changes


  const handleButtonClick = () => {
    if (token) {
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
    setRefresh(!refresh);
  };


  const inputHandler = (e) => {

    setContent(e.target.value);

  }

  const addHandler = () => {

    const reviewLabelDiv = document.getElementById("reviewLabel");
    if (content === undefined || content === null || content === '') {
      if (reviewLabelDiv) {
        // Modify the style of the div as needed
        reviewLabelDiv.style.display = '';
        // Add more style modifications as needed
      }
    }
    else {
      if (reviewLabelDiv) {
        // Modify the style of the div as needed
        reviewLabelDiv.style.display = 'none';
        // Add more style modifications as needed
      }

      console.log({ username, content });
      axiosInstance.post(`books/booksReview/${id}`, { username, content }).then((res) => {
        console.log("data:", res.data.message);
        toast.success(res.data.message, {
          // Set to 15sec
          position: "bottom-right",
          autoClose: 1500,
          onClose: () => {
            setContent('');

          },

        });

        setRefresh(!refresh);
      }).catch((error) => {
        console.log('Error adding review:', error);
      })

    }

  }


  /////////////////////......Pagination Review......////////////////////////////
  console.log("review list :", reviewlist);

  const [currentPage, setCurrentPage] = useState(1);
  //const pageCount = 10; // Replace with the actual total number of pages
  const itemsPerPage = 5;
  const pageCount = Math.ceil(reviewlist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = reviewlist.slice(startIndex, endIndex);


  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    // Perform any additional logic (e.g., fetch data for the new page) here
  };
  /////////////////////......Pagination Review End......////////////////////////////



  /////////// .........SimilarBooks Start Here..............//////////////////////

  // const similarBooks = [
  //   { id: 1, title: 'Book 1', author: 'Author 1' },
  //   { id: 2, title: 'Book 2', author: 'Author 2' },
  //   { id: 3, title: 'Book 3', author: 'Author 3' },
  //   { id: 4, title: 'Book 4', author: 'Author 4' },
  //   { id: 5, title: 'Book 5', author: 'Author 5' },
  //   { id: 6, title: 'Book 6', author: 'Author 6' },
  //   // Add more books as needed
  // ];

  /////////// .........SimilarBooks Ends Here..............//////////////////////


  return (
    <Grid container sx={{ minHeight: '78vh', marginBottom: '30px' }} component={Paper} elevation={6} square>
      <CssBaseline />
      <Box sx={{ width: '100%' }}>
        {/* For notifications */}
        <ToastContainer />
      </Box>
      <Grid item
        xs={false}
        sm={4}
        md={4}
      >
        <Box
          className="imageBox"
        >
          <img src={book.imageUrl && `data:image/jpeg;base64,${arrayBufferToBase64(book.imageUrl.data)}`} />
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
              {book.available ? "Available" : "Rent"}
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

      {/* Modal for form request */}

      <StyledModal isOpen={isModalOpen} handleClose={handleModalClose} bookData={book._id} userName={username} userId={userid} />
      {/* End modal for form request */}

      {/* Book Description   */}
      <Container width="lg">
        <Grid item
          xs={false}
          sm={12}
          md={12}
        >
          <p className='alignJustify'>{book.description}</p>
        </Grid>
      </Container>

      {/* ******* Add review section******** */}
      < Container width="lg" >
        {canReview ? (
          <>
            <Grid item
              xs={false}
              sm={12}
              md={12}
              textAlign="left"
            >
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <Typography variant="h6" textAlign="left">Review this book</Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="reviewText"
                  name='content'
                  onChange={inputHandler}
                  label="write your review"
                  value={content}
                  sx={{ mt: 2 }} />
                <InputLabel
                  id={"reviewLabel"}
                  style={{ color: "red", marginTop: '5px', display: 'none' }}
                  className='textAlignLeft' >Please write a review
                </InputLabel>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12} textAlign={'right'}>
              <Button variant='contained' sx={{ mt: 2 }} className='commonButton' onClick={addHandler} >Post Review</Button>
            </Grid>
          </>
        ) : null}
        {/* ******* Add review section ends here******** */}

        {/* ******* customer review section ******* */}
        
          <Grid item
            xs={false}
            sm={12}
            md={12}
            textAlign="left"
          >
            <Typography variant="h6" textAlign="left">Customer Reviews ({(book.reviews) ? book.reviews.length : 0})</Typography>
          </Grid>
       

        <Grid item xs={12} md={12} lg={12} textAlign={'right'}>
          {(book.reviews) ? (
            <>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }} >
                {currentData.map((review, index) => (

                  <>
                    {/* ......................Review List.................. */}

                    <ListItem alignItems="flex-start" key={index}>
                      <ListItemAvatar>
                        <Avatar alt="" src="/static/images/avatar/2.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={review.username}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {review.content}
                            </Typography>

                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </>
                ))}
              </List>
              <Box>
                {(reviewlist.length > itemsPerPage) ? (
                  <CustomPagination pageCount={pageCount} currentPage={currentPage} onChange={handlePageChange} />
                ) : ''}
              </Box>
            </>
          ) : null}

        </Grid>

        {/* Render SimilarBooksCarousel with similar books data */}
        {similarBooks && (
        <Grid item xs={12} md={12} lg={12} textAlign={'right'} marginTop='10px'>
          <Typography variant="h6" textAlign="left">Similar Books</Typography>
          <SimilarBooks similarBooks={similarBooks} />
        </Grid>
        )}
      </Container>

    </Grid >

  )
}

export default BookDetail