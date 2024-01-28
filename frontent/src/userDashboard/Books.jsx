import React, { useEffect, useState } from 'react'
import { Container, Typography, Grid, Card, CardActionArea, CardContent, CardMedia, Pagination, TextField, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import '../css/Style.css'
import axios from 'axios';
import axiosInstance from '../axiosinterceptor';
import './UserStyle.css'

// const bookData = [
//     {
//         title: 'Harry Potter',
//         author: 'J. K. Rowling',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover1.jpg',
//         id: 1,
//         genre: "Kids"
//     },
//     {
//         title: 'Sulwe',
//         author: "Lupita Nyong'o",
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover2.jpg',
//         id: 2,
//         genre: "Kids"
//     },

//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover3.jpg',
//         id: 3
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover4.jpg',
//         id: 4
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover5.jpg',
//         id: 5
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover6.jpg',
//         id: 6
//     },

//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover7.jpg',
//         id: 7
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover8.jpg',
//         id: 8
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover9.jpg',
//         id: 9
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover11.jpg',
//         id: 10
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover12.jpg',
//         id: 11
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover13.jpg',
//         id: 12
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover14.jpg',
//         id: 13
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover15.jpg',
//         id: 14
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover16.jpg',
//         id: 15
//     },

//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover17.jpg',
//         id: 16
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover18.jpg',
//         id: 17
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover19.jpg',
//         id: 18
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover20.jpg',
//         id: 19
//     },
//     {
//         title: 'Book 1',
//         author: 'Author 1',
//         imageUrl: process.env.PUBLIC_URL + '/cover/cover10.jpg',
//         id: 20
//     },

// ];



const Books = () => {

    const [bookData, setbookdata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/books/getbooklist/');
                console.log("book data is", response.data);
                setbookdata(response.data);
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };

        fetchData();
    }, []);

    const itemsPerPage = 12; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter books based on search query and selected category
    const filteredBooks = bookData.filter(book =>
        (book.title.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') &&
        (selectedCategory === 'All' || book.genre === selectedCategory)
    );

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    console.log("end index", endIndex)

    // Get the current page's books
    const currentBooks = filteredBooks.slice(startIndex, endIndex);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to the first page when the search query changes
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1); // Reset to the first page when the category changes
    };

    const genres = ['All', 'Kids', 'Fiction', 'Non-Fiction', 'Biography'];


    return (
        <section>
            <Typography variant="h4" gutterBottom sx={{ mt: '20px' }}>
                Rent Unlimited Books
            </Typography>
            <Container spacing={3} maxWidth="md" component="filter">
                <Grid container spacing={3} className='paddingMedia'>
                    <Grid item xs={12} sm={12} md={6} >
                        {/* Search Input */}
                        <TextField
                            label="Search Books"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                        {/* Category Filter */}
                        <TextField
                            select
                            label="Genre"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            {genres.map((genre) => (
                                <MenuItem key={genre} value={genre}>
                                    {genre}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </Container>



            <Grid container spacing={3} className='paddingMedia' >
                {/*books cards go here */}
                {currentBooks.map((book, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Link to={`/bookDetail/${book._id}`} className='linkStyle'>
                            <Card>
                                <CardActionArea>
                                    <img src={book.imageUrl} style={{ height: '250px', marginTop: '15px' }} alt={book.title} />
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
                {/* Pagination Controls */}
                <Grid container justifyContent="center" marginTop={2}>
                    <Pagination
                        count={Math.ceil(filteredBooks.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(event, page) => handlePageChange(page)}
                        color="primary"
                    />
                </Grid>
            </Grid>
        </section>
    )
}

export default Books