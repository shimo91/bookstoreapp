import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Menu, MenuItem, Pagination, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { axiosAdmin } from '../../axiosinterceptor'
import { useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import MoreIcon from '@mui/icons-material/MoreVert';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { cyan } from '@mui/material/colors';
import AddBookMoDal from './AddBook'
import { arrayBufferToBase64 } from '../../utils'

// Create a custom theme
const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#bbe2ed', // Set the desired background color for Paper
          padding: '15px 15px 15px 15px',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#146e87', // Set the desired background color for TableContainer
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'white', // Set the desired text color
        },
      },
    },
  },
});

const buttonColor = cyan[600];
const buttonHoverColor = cyan[700];


const AdminHome = () => {

  const [books, setBooks] = useState([]);
  const [refresh, setRefresh] = useState(false); // State variable to trigger refresh
  const [bookAvailable, setBookAvailableMap] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookData, setBookData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAdmin.get('/books/getbooklist');
        // console.log("book data is", response.data);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, [refresh]);


  useEffect(() => {
    //console.log("bookAvailable:", bookAvailable);
  }, [bookAvailable]);

  const itemsPerPage = 12; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter books based on search query and selected category
  const filteredBooks = books.filter(book =>
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') &&
    (selectedCategory === 'All' || book.genre === selectedCategory)
  );

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // console.log("end index", endIndex)

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



  const handleToggle = (bookId, available) => {


    axiosAdmin.put(`books/updateAvailable/${bookId}`, { available: !available }).then((res) => {
      // console.log("data:", res.data.message);
      toast.success(res.data.message, {
        // Set to 15sec
        position: "bottom-right",
        autoClose: 1500,
        onClose: () => {
          setBookAvailableMap((prevMap) => {
            const updatedMap = {
              ...prevMap,
              [bookId]: !prevMap[bookId],
            };
            // console.log("Updated Book Available Map:", updatedMap);
            return updatedMap;
          });

          setRefresh(!refresh);
        },

      });



    }).catch((error) => {
      console.log('Error adding review:', error);
    })

  }

  //console.log("Book Available Map:", bookAvailable);


  const [anchorEls, setAnchorEls] = useState(Array(books.length).fill(null));

  const handleMenu = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };


  // Add book modal code starts here

  const handleButtonClick = () => {
    setBookData('');
    //open the modal with the form
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    // Close the modal
    setIsModalOpen(false);
    setRefresh(!refresh);
  };

    // Add book modal code is ends here

     // Edit modal 
   const handleEditClick = (data,index) => {
    // Set the initial values for the form fields
    setBookData(data);

    handleClose(index)
    // Open the modal
    setIsModalOpen(true);
  };

  const [delId, setDelid] = useState('');
  const [dialopen, setDialOpen] = React.useState(false);

  const handleClickOpen = (id, index) => {
    setDelid(id)
    handleClose(index)
    setDialOpen(true);
  };

  const handleDialClose = () => {
    setDialOpen(false);
  };


  const removeDis = () => {
    setDialOpen(false);
    const did = delId;
    console.log("delete id :" + did);
    axiosAdmin.delete('books/remove/' + did).then((res) => {
      console.log("delete",res.data.message)
      toast.success(res.data.message, {
        // Set to 15sec
        position: "bottom-right",
        autoClose: 1500,
        onClose: () => {
          setRefresh(!refresh);
        },

      });

    })
  }


 

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper elevation={3} style={{ margin: '10px', width: '100%', padding: '30px' }}>
          <Box sx={{ width: '100%' }}>
            {/* For notifications */}
            <ToastContainer />
          </Box>
          <Typography variant="h5" gutterBottom>
            Book List
          </Typography>

          <Container spacing={1} maxWidth="large" component="filter">
            <Grid container spacing={4} className='paddingMedia'>
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
          <Container spacing={1} maxWidth="large" component="add" style={{ textAlign: 'right', padding: '0px' }}>
            <Button
              variant="contained"
              sx={{
                mt: 3, mb: 2,
                backgroundColor: buttonColor,
                '&:hover': {
                  backgroundColor: buttonHoverColor,
                },
              }}
              onClick={handleButtonClick}
            >
              <LibraryAddIcon /> Add Book
            </Button>
          </Container>
          <TableContainer maxWidth="large" component={Paper} >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell>Reviews</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Rented Count</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {currentBooks.map((row, index) => (

                  <TableRow key={index}>
                    <TableCell ><Link to={`/detail/${row._id}`} className='linkStyle'>{row.title}</Link></TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>
                      <img
                        src={row.imageUrl && `data:image/jpeg;base64,${arrayBufferToBase64(row.imageUrl.data)}`}
                        style={{ height: '50px', marginTop: '5px' }}
                        alt={row.title}
                      />

                    </TableCell>
                    <TableCell>{row.genre}</TableCell>
                    <TableCell
                      style={{ textAlign: 'center' }}
                    >
                      <Link
                        to={`/detail/${row._id}`}
                        className='linkStyle'
                      >
                        {(row.reviews.length > 0) ? (
                          <>
                            {row.reviews.length} <br /> Click Here
                          </>
                        ) : (
                          "0"
                        )}

                      </Link>
                    </TableCell>
                    <TableCell>{(row.available) ? "Available" : "Rented"}
                      <Switch
                        checked={(bookAvailable[row._id]) ? bookAvailable[row._id] : row.available}
                        onChange={() => handleToggle(row._id, row.available)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </TableCell>
                    <TableCell style={{ textAlign: 'center' }}>{row.rentUser.length}</TableCell>
                    <TableCell>
                      <IconButton
                        size="large"
                        aria-label="display more actions"
                        edge="end"
                        color="inherit"
                        onClick={(event) => handleMenu(event, index)}
                      >
                        <MoreIcon />
                      </IconButton>
                      <Menu
                        id={`menu-appbar-${index}`}
                        anchorEl={anchorEls[index]}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorEls[index])}
                        onClose={() => handleClose(index)}
                      >
                        <Link to={`/detail/${row._id}`} style={{ textDecoration: 'none' }}>
                          <MenuItem color="primary" sx={{ color: green[500] }}><VisibilityIcon />View</MenuItem>
                        </Link>
                        <MenuItem onClick={() => { handleEditClick(row, index) }} sx={{ color: blue[500] }}><EditIcon />Edit</MenuItem>
                        <MenuItem onClick={() => { handleClickOpen(row._id, index) }} sx={{ color: red[500] }}><DeleteOutlinedIcon />Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>

                ))}

              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination Controls */}
          <Grid container justifyContent="center" marginTop={2}>
            <Pagination
              count={Math.ceil(filteredBooks.length / itemsPerPage)}
              page={currentPage}
              onChange={(event, page) => handlePageChange(page)}
              color="primary"
            />
          </Grid>
        </Paper>
      </ThemeProvider>

      {/* Delete confirmation modal */}
      <Dialog
        open={dialopen}
        onClose={handleDialClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want ot delete this book
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={removeDis} autoFocus>
            Yes
          </Button>
          <Button onClick={handleDialClose}>No</Button>

        </DialogActions>
      </Dialog>
      {/* Delete confirmation modal end here */}

      {/* Add book modal starts here */}

      <AddBookMoDal isOpen={isModalOpen} handleClose={handleModalClose} initialData={bookData} />

      {/* Add book modal ends here */}

    </>

  )
}

export default AdminHome