import React from 'react'

import { Dialog, DialogTitle, DialogContent, Button, Box, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const RequestForm = ({ handleClose,bookId }) => {
  console.log("bookid",bookId)

  const [book, setData] = useState([]);
  useEffect(() => {
    console.log("axios")
    axios.get('http://127.0.0.1:4000/books/bookDetail/' + bookId).then((res) => {
      setData(res.data);
      console.log("list of discussion : ",res.data);
    })
  }, [bookId]);
  // useEffect(() => {
  //   const fetchBookDetails = async () => {
  //     try {
  //       console.log("axios")
  //       const response = await axios.get(`http://127.0.0.1:4000/books/bookDetail/${bookId}`);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching book details:', error);
  //       // Handle error, e.g., setError(error);
  //     }
  //   };
  
  //   fetchBookDetails();
  // });


  const { control, handleSubmit, setValue, watch, formState: { errors }, clearErrors, reset } = useForm({
    defaultValues: {
      bookname: book.title || '', // Set the default value for 'bookname'
      // Add default values for other fields if needed
    }
  });

  const [open, setOpen] = useState(false);
  const [openF, setOpenF] = useState(false);
  const [error, setError] = useState(null);


  const handleCloseButtonClick = () => {
    handleClose(); // Ensure that handleClose is correctly called
  };
  return (
    <>
      <DialogTitle>Rent Request Form - {book.title}</DialogTitle>
      <DialogContent >
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="bookname"
                  control={control}
                  rules={{ required: 'Book Name is required' }}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        autoComplete="given-name"
                        name="bookname"
                        fullWidth
                        id="bookname"
                        label="Book Name"
                        InputProps={{ readOnly: false }}
                      />
                      {errors.bookname && <div className="errorMessageStyle">{errors.bookname.message}</div>}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="author"
                  control={control}
                  rules={{ required: 'Author is required' }}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        name="author"
                        fullWidth
                        id="author"
                        label="Author"
                        defaultValue={book.author}
                      />
                      {errors.author && <div className="errorMessageStyle">{errors.author.message}</div>}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: 'Name is required',
                  }}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        fullWidth
                        name="username"
                        label="Name"
                        id="username"
                      />
                      {errors.username && <div className="errorMessageStyle">{errors.username.message}</div>}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="libraryid"
                  control={control}
                  rules={{
                    required: 'Library Id is required',
                  }}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        fullWidth
                        name="libraryid"
                        label="Library Id"
                        id="libraryid"
                      />
                      {errors.libraryid && <div className="errorMessageStyle">{errors.libraryid.message}</div>}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="address"
                  control={control}
                  rules={{
                    required: 'Address is required',
                  }}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                      />
                      {errors.address && <div className="errorMessageStyle">{errors.address.message}</div>}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: 'Phone Number is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Invalid phone number',
                    }
                  }}
                  render={({ field }) => (
                    <>
                      <TextField
                        {...field}
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                      />
                      {errors.phoneNumber && <div className="errorMessageStyle">{errors.phoneNumber.message}</div>}
                    </>
                  )}
                />
              </Grid>
              
            </Grid>


            <Grid container justifyContent="center" sx={{marginTop:2}}>
              <Grid item>

                <Button type="submit" variant="contained" style={{ marginRight: '8px' }}>
                  Submit
                </Button>
                <Button type="button" variant="contained" color='error' onClick={handleCloseButtonClick}>
                  Cancel
                </Button>

              </Grid>
            </Grid>
          </Box>

        </form>
      </DialogContent>
    </>
  );
};

const StyledModal = ({ isOpen, handleClose,bookData }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <RequestForm handleClose={handleClose} bookId={bookData}/>
    </Dialog>
  );
};

export default StyledModal;