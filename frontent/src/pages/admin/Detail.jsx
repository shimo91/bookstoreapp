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
import CustomPagination from '../../components/CustomPagination'
import { ToastContainer, toast } from "react-toastify";
import { axiosAdmin } from '../../axiosinterceptor';
import { arrayBufferToBase64 } from '../../utils'
import { cyan } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import AddBookMoDal from './AddBook';

const buttonColor = cyan[600];
const buttonHoverColor = cyan[700];

const Detail = () => {
    const { id } = useParams();
    const [book, setData] = useState([]);
    const [reviewlist, setreviewlist] = useState([]);
    const [refresh, setRefresh] = useState(false); // State variable to trigger refresh
    const [bookData, setBookData] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:4000/books/bookDetail/' + id).then((res) => {
            setData(res.data);
            // console.log("list of rentuserid : ",res.data.rentUser);
            setreviewlist(res.data.reviews)
        })
    }, [id, refresh]);





    /////////////////////......Pagination Review......////////////////////////////
    console.log("review list :", reviewlist);

    const [currentPage, setCurrentPage] = useState(1);
    //const pageCount = 10; // Replace with the actual total number of pages
    const itemsPerPage = 10;
    const pageCount = Math.ceil(reviewlist.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = reviewlist.slice(startIndex, endIndex);


    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
        // Perform any additional logic (e.g., fetch data for the new page) here
    };
    /////////////////////......Pagination Review End......////////////////////////////


    // Edit modal 
    const handleEditClick = (data) => {
        // Set the initial values for the form fields
        setBookData(data);
        // Open the modal
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        // Close the modal
        setIsModalOpen(false);
        setRefresh(!refresh);
      };

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
                        <Button
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2,
                                backgroundColor: buttonColor,
                                '&:hover': {
                                    backgroundColor: buttonHoverColor,
                                },
                            }}
                            onClick={() => { handleEditClick(book) }}
                        >
                            <EditIcon /> Edit
                        </Button>
                    </Box>
                </Box>
            </Grid>

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


            {/* ******* customer review section ******** */}

            <Container width="lg">
                <Grid item
                    xs={false}
                    sm={12}
                    md={12}
                    textAlign="left"
                    mt={2}
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

            </Container>
            {/* Edit book modal starts here */}

            <AddBookMoDal isOpen={isModalOpen} handleClose={handleModalClose} initialData={bookData} />

            {/* Edit book modal ends here */}

        </Grid >



    )
}

export default Detail