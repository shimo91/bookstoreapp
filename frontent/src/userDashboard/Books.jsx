import React, { useEffect, useState } from 'react'
import { Container, Typography, Grid, Card, CardActionArea, CardContent, Pagination, TextField, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import '../css/Style.css'
import {axiosInstance} from '../axiosinterceptor';
import './UserStyle.css'
import { arrayBufferToBase64 } from '../utils';

const Books = () => {

    const [bookData, setbookdata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/books/getbooklist');
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
                                    <img src={book.imageUrl && `data:image/jpeg;base64,${arrayBufferToBase64(book.imageUrl.data)}`} style={{ height: '250px', marginTop: '15px' }} alt={book.title} />
                                    <CardContent className='linkStyle'>
                                        <Typography component="div" fontSize='6' color="textSecondary">
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