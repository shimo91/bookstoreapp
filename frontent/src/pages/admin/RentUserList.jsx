import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { axiosAdmin } from '../../axiosinterceptor';
import { Avatar, Box, List, ListItem, ListItemText, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";

const RentUserList = () => {
  const [rentUsers, setRentUsers] = useState([]);
  //const [deliveredStatus, setDeliveredStatus] = useState(false);
  const [refresh, setRefresh] = useState(false); // State variable to trigger refresh
  const [deliveredStatusMap, setDeliveredStatusMap] = useState({});


  useEffect(() => {
    // Fetch rent users from your API or database
    const fetchData = async () => {
      try {
        const response = await axiosAdmin.get('books/rentUsers');
        console.log("book rent data is", response.data);
        setRentUsers(response.data);
      } catch (error) {
        console.error("Error fetching rent users:", error);
      }
    };

    fetchData();
  }, [refresh]); // Empty dependency array ensures the effect runs once after the initial render


  const handleToggle = (userId, bookId) => {

    const switchId = `${userId}-${bookId}`;

    // Get the previous map value from state
    const prevMap = deliveredStatusMap;


    // Update the state by creating a new object and toggling the value for the specific switch
    setDeliveredStatusMap((prevMap) => ({
      ...prevMap,
      [switchId]: !prevMap[switchId], // Toggle the value
    }));

    axiosAdmin.post(`books/updatedelivery/${bookId}`, { rentid: userId, deliverystatus: !prevMap[switchId], }).then((res) => {
      console.log("data:", res.data.message);
      toast.success(res.data.message, {
        // Set to 15sec
        position: "bottom-right",
        autoClose: 1500,
        onClose: () => {
          setRefresh(!refresh);
        },

      });


    }).catch((error) => {
      console.log('Error adding review:', error);
    })
  };

  return (
    <Paper elevation={3} style={{ padding: '10px', margin: '10px', width: '100%'}}>
      <Box sx={{ width: '100%' }}>
        {/* For notifications */}
        <ToastContainer />
      </Box>
      <Typography variant="h5" gutterBottom>
        Book Rent Request List
      </Typography>

      <TableContainer component={Paper} style={{backgroundColor:'#bbe2ed' }} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>User Nmae</TableCell>
              <TableCell>Library Id</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Booked On</TableCell>
              <TableCell>Delivered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentUsers.map((rent, index) => (
              <TableRow key={index}>
                <TableCell>{rent.book.title}</TableCell>
                <TableCell>{rent.book.author}</TableCell>
                <TableCell>{rent.user.username}</TableCell>
                <TableCell>{rent.user.libraryid}</TableCell>
                <TableCell>{rent.user.address}</TableCell>
                <TableCell>{rent.user.phoneNumber}</TableCell>
                <TableCell>{new Date(rent.user.bookedon).toDateString()}</TableCell>
                <TableCell>
                  <Switch
                    checked={deliveredStatusMap[`${rent.user._id}-${rent.book.id}`] || false}
                    onChange={() => handleToggle(rent.user._id, rent.book.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default RentUserList