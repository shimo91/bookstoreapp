import { Grid, List, ListItem, ListItemText, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { arrayBufferToBase64 } from '../utils';
import { useState } from 'react';

const OrderDetail = ({ order }) => {
    console.log("orderlist", order);


    const itemsPerPage = 5; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

   
     console.log("orderlength", order.length)

    // Get the current page's books
    const currentOrder = order.slice(startIndex, endIndex);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    return (

        <Paper elevation={3} style={{ margin: '40px 0px 20px 0px', padding: '20px', maxWidth: '100%' }}>
            <Typography variant="h5" gutterBottom textAlign={'center'}>
                Order Details
            </Typography>
            <TableContainer maxWidth="large" component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow style={{textAlign:'center'}}>
                            <TableCell>Book Name</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Booked On</TableCell>
                            <TableCell>Rental Period</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {currentOrder.map((row, index) => (

                            <TableRow key={index} style={{textAlign:'center'}}>
                                <TableCell >{row.bookname}</TableCell>
                                <TableCell>{row.bookDetails.author}</TableCell>
                                <TableCell>
                                    <img
                                        src={row.bookDetails.imageUrl && `data:image/jpeg;base64,${arrayBufferToBase64(row.bookDetails.imageUrl.data)}`}
                                        style={{ height: '50px', marginTop: '5px' }}
                                        alt={row.bookname}
                                    />
                                </TableCell>

                                <TableCell>
                                    {row.bookDetails.rentUser[0] && row.bookDetails.rentUser[0].bookedon
                                        ? new Date(row.bookDetails.rentUser[0].bookedon).toDateString()
                                        : 'N/A'}
                                </TableCell>
                                <TableCell style={{ textAlign: 'center' }}>{row.bookDetails.rental_period}</TableCell>
                                <TableCell>
                                    {row.bookDetails.rentUser[0] && row.bookDetails.rentUser[0].deliveryStatus
                                        ? 'Delivered'
                                        : 'Pending'}
                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            {/* Pagination Controls */}
            {(order.length>5) ? <>
            <Grid container justifyContent="center" marginTop={2}>
                <Pagination
                    count={Math.ceil(order.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(event, page) => handlePageChange(page)}
                    color="primary"
                />
            </Grid> </>
             : null }

        </Paper>
    )
}

export default OrderDetail