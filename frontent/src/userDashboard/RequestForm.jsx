import React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, Box, Grid, TextField, InputLabel } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import {axiosInstance} from '../axiosinterceptor';

const RequestForm = ({ handleClose, bookId, userName, userid }) => {

  const [errordata, setError] = useState();
  console.log("bookid", bookId, "username", userName)
  const [book, setBook] = useState({});
  const [userdetail, setUserDetail] = useState({});
  const [refresh, setRefresh] = useState(false); // State variable to trigger refresh

  useEffect(() => {
    axios.get('http://127.0.0.1:4000/books/bookDetail/' + bookId).then((res) => {
      setBook(res.data);
      console.log("list of discussion : ", res.data);
    })
  }, [bookId]);

  useEffect(() => {
    console.log("userid inside effect", userid)
    axiosInstance.get('login/' + userid).then((res) => {
      setUserDetail(res.data);
      console.log("userdetail : ", res.data);
    })
  }, [userid]);

  const { control, handleSubmit, setValue, watch, formState: { errors }, clearErrors, reset } = useForm();

  useEffect(() => {
    // Set default values when book changes
    setValue('bookname', book.title);
    setValue('author', book.author);
    setValue('username', userName);
    setValue('libraryid', userdetail.libraryId);
    setValue('phoneNumber', userdetail.phone);
    setValue('address', userdetail.address);
  }, [book,userdetail,setValue,userName]);



  const handleCloseButtonClick = () => {
    handleClose(); // Ensure that handleClose is correctly called
  };


  const onSubmit = async (data) => {
    const formData = {
      userid: userid,
      bookid: bookId,
      username:data.username,
      libraryid:data.libraryid,
      address:data.address,
      phoneNumber:data.phoneNumber,
      bookname:data.bookname,
    }

    console.log("data is", formData)
    axiosInstance.post('books/bookRent', formData).then((res) => {
      if (res.data.message) {
        console.log("success", res.data.message)
        toast.success(res.data.message, {
          // Set to 15sec
          position: "top-right",
          autoClose: 3000,
          onClose: () => {
            handleClose();
            
          },

        });
        
      }
    }).catch((error) => {
      console.log('Error adding review:', error);

      // Set the error message in the state
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An error occurred while setting up the request.");
      }

      toast.error(errordata, {
        // Set to 15sec
        position: "top-right",
        autoClose: 3000,
      });
    })

  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {/* For notifications */}
        <ToastContainer />
      </Box>
      <DialogTitle>Rent Request Form </DialogTitle>
      <DialogContent >
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="bookname"
                  control={control}
                  rules={{ required: 'Book Name is required' }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="bookname">Book Name</InputLabel>
                      <TextField
                        {...field}
                        autoComplete="given-name"
                        name="bookname"
                        fullWidth
                        id="bookname"
                        InputProps={{ readOnly: true }}
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
                      <InputLabel htmlFor="author">Author</InputLabel>
                      <TextField
                        {...field}
                        name="author"
                        fullWidth
                        id="author"
                        InputProps={{ readOnly: true }}
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
                      <InputLabel htmlFor="username">Name</InputLabel>
                      <TextField
                        {...field}
                        fullWidth
                        name="username"
                        id="username"
                        InputProps={{ readOnly: true }}
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
                      <InputLabel htmlFor="libraryid">Library Id</InputLabel>
                      <TextField
                        {...field}
                        fullWidth
                        name="libraryid"
                        id="libraryid"
                        InputProps={{ readOnly: true }}
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
                      <InputLabel htmlFor="address">Address</InputLabel>
                      <TextField
                        {...field}
                        fullWidth
                        id="address"
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
                      <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                      <TextField
                        {...field}
                        fullWidth
                        id="phoneNumber"
                        name="phoneNumber"
                      />
                      {errors.phoneNumber && <div className="errorMessageStyle">{errors.phoneNumber.message}</div>}
                    </>
                  )}
                />
              </Grid>

            </Grid>


            <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
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

const StyledModal = ({ isOpen, handleClose, bookData, userName, userId }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <RequestForm handleClose={handleClose} bookId={bookData} userName={userName} userid={userId} />
    </Dialog>
  );
};

export default StyledModal;