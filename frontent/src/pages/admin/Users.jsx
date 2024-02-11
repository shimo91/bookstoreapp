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
import EditUserMoDal from './EditUser'

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

const Users = () => {


  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false); // State variable to trigger refresh
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAdmin.get('login');
        // console.log("book data is", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, [refresh]);

console.log("userlist",users);

  const itemsPerPage = 12; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter user based on search query
  // const filteredUsers = users.filter(user =>
  //   (user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') &&
  //   (user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '')
  // );


  const filteredUsers = users.filter(user => {
    const searchableFields = ['first_name', 'last_name', 'email', 'username'];
  
    return searchableFields.some(field =>
      user[field] && user[field].toLowerCase().includes(searchQuery.toLowerCase())
    ) || searchQuery === '';
  });

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // console.log("end index", endIndex)

  // Get the current page's user
  const currentUsers= filteredUsers.slice(startIndex, endIndex);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };





  const [anchorEls, setAnchorEls] = useState(Array(users.length).fill(null));

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


     // Edit modal 
   const handleEditClick = (data,index) => {
    // Set the initial values for the form fields
    setUserData(data);

    handleClose(index)
    // Open the modal
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    // Close the modal
    setIsModalOpen(false);
    setRefresh(!refresh);
  };

  // Edit modal ends here



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
    axiosAdmin.delete('login/remove/' + did).then((res) => {
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
            User List
          </Typography>

          <Container spacing={1} maxWidth="md" component="filter">
            <Grid container spacing={2} className='paddingMedia' justifyContent="center">
              <Grid item xs={12} sm={12} md={6} >
                {/* Search Input */}
                <TextField
                  label="Search User"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Grid>
              
            </Grid>
          </Container>
      
          <TableContainer maxWidth="large" component={Paper} >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Library Id</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {currentUsers.map((row, index) => (

                  <TableRow key={index}>
                    <TableCell >{`${row.first_name} ${row.last_name}`}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.libraryId}</TableCell>
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
                        
                        <MenuItem onClick={() => { handleEditClick(row._id, index) }} sx={{ color: blue[500] }}><EditIcon />Edit</MenuItem>
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
              count={Math.ceil(filteredUsers.length / itemsPerPage)}
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
            Are you sure you want ot delete this user
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

      {/* User modal starts here */}

      <EditUserMoDal isOpen={isModalOpen} handleClose={handleModalClose} initialData={userData} />

      {/* User modal ends here */}

    </>

  )
}

export default Users