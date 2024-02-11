import React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, Box, Grid, TextField, InputLabel, InputAdornment, IconButton, FormControl, MenuItem, Switch } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { axiosAdmin } from '../../axiosinterceptor';
import { selectOptions } from './Options';
import Select from '@mui/material/Select';
import { useDropzone } from 'react-dropzone';
import { arrayBufferToBase64 } from '../../utils'

const AddBook = ({ handleClose, bookdata }) => {

  const [errordata, setError] = useState();
  const [bookAvailable, setBookAvailable] = useState(true);
  //console.log("bookdata", bookdata);

  const { control, handleSubmit, setValue, watch, formState: { errors }, clearErrors, reset } = useForm();

  // useEffect(() => {
  //   // Set default values when book changes
  //   setValue('available', bookAvailable);
  // }, [bookAvailable]);

  useEffect(() => {
    reset();
    // Set default values when book changes
    setValue('available', bookdata?.available ?? true);
    // Set initial form data for editing
    reset(bookdata);
    // Set the image field value
    setValue('imageUrl', bookdata?.imageUrl ?? '');


  }, [bookdata, reset, setValue]);

  // const setDefaultValues = () => {
  //   // Set default values for other fields as needed
  //   setValue('title', ''); // Example: Set title to an empty string
  //   setValue('author', ''); // Example: Set author to an empty string
  //   // ... set default values for other fields
  // };

  const handleCloseButtonClick = () => {
    handleClose(); // Ensure that handleClose is correctly called
  };

  const handleToggle = () => {
    // setBookAvailable((prevValue) => !prevValue);
    setBookAvailable((prevValue) => {
      console.log('Previous Value:', prevValue);
      const newValue = !prevValue || false;
      console.log('New Value:', newValue);
      return newValue;
    });
  }


  const onSubmit = async (data) => {
    console.log("data is", data)

    try {

      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('author', data.author);
      // Conditionally append imageUrl if it has a value
      if (data.imageUrl) {
        formData.append('imageUrl', data.imageUrl);
      }
      // formData.append('imageUrl', data.imageUrl);
      formData.append('genre', data.genre);
      formData.append('languages', data.languages);
      formData.append('rental_period', data.rental_period);
      formData.append('description', data.description);
      formData.append('isbn_number', data.isbn_number);
      formData.append('published_on', data.published_on);
      formData.append('available', bookAvailable);

      console.log("formatData", formData);
      console.log("dataid", data.bid)
      //Make a POST request to your Node.js server
      //const response = await axiosAdmin.post('books/add', data)

      // Check if there is an ID in the data
      if (bookdata._id) {
        console.log("inside if");
        // Make a PUT request for editing
        const response = await axiosAdmin.put('books/update/' + bookdata._id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });


        if (response.data.message) {
          console.log("success", response.data.message)
          toast.success(response.data.message, {
            // Set to 15sec
            position: "top-right",
            autoClose: 3000,
            onClose: () => {
              handleClose();

            },

          });
        } else {
          console.error('Failed to update data');
        }
      } else {
        console.log("inside else")

        const response = await axiosAdmin.post('books/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.message) {
          console.log("success", response.data.message)
          toast.success(response.data.message, {
            // Set to 15sec
            position: "top-right",
            autoClose: 3000,
            onClose: () => {
              handleClose();

            },

          });
        } else {
          console.error('Failed to upload data');
        }
      }
    } catch (error) {
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
    }


  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        {/* For notifications */}
        <ToastContainer />
      </Box>
      <DialogTitle>{(bookdata) ? 'Edit' : 'Add'} Book</DialogTitle>
      <DialogContent >
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: 'Book Name is required' }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="bookname">Book Name</InputLabel>
                      <TextField
                        {...field}
                        autoComplete="given-name"
                        name="title"
                        fullWidth
                        id="title"
                      />
                      {errors.title && <div className="errorMessageStyle">{errors.title.message}</div>}
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
                      />
                      {errors.author && <div className="errorMessageStyle">{errors.author.message}</div>}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>

                <Controller
                  name='imageUrl'
                  control={control}
                  rules={{ required: 'Book Image is required' }}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="imageUrl">Book Image</InputLabel>
                      <TextField
                        fullWidth
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files[0])}
                        ref={field.ref}
                      />
                      {errors.imageUrl && <div className="errorMessageStyle">{errors.imageUrl.message}</div>}
                    </>
                  )}
                />
                {(bookdata.imageUrl) ? <img
                  src={bookdata.imageUrl && `data:image/jpeg;base64,${arrayBufferToBase64(bookdata.imageUrl.data)}`}
                  style={{ height: '50px', marginTop: '5px' }}
                /> : ''}


              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="genre"
                  control={control}
                  rules={{ required: 'Genre is required' }}
                  defaultValue={selectOptions[0].value}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="genre">Genre</InputLabel>
                      <FormControl fullWidth>
                        <Select
                          id="genre"
                          {...field}
                        >
                          {selectOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {errors.genre && <div className="errorMessageStyle">{errors.genre.message}</div>}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="languages"
                  control={control}
                  rules={{
                    required: 'Language is required',
                  }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="languages">Languages</InputLabel>
                      <TextField
                        {...field}
                        fullWidth
                        id="languages"
                        name="languages"
                      />
                      {errors.languages && <div className="errorMessageStyle">{errors.languages.message}</div>}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="rental_period"
                  control={control}
                  rules={{
                    required: 'Rental Period is required'
                  }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="rental_period">Rental Period</InputLabel>
                      <TextField
                        {...field}
                        fullWidth
                        id="rental_period"
                        name="rental_period"
                      />
                      {errors.rental_period && <div className="errorMessageStyle">{errors.rental_period.message}</div>}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: 'Description is required',
                  }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="description">Description</InputLabel>
                      <TextField
                        {...field}
                        fullWidth
                        id="description"
                        name="description"
                      />
                      {errors.description && <div className="errorMessageStyle">{errors.description.message}</div>}
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="isbn_number"
                  control={control}
                  rules={{
                    required: 'ISBN Number is required',
                  }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="isbn_number">ISBN Number</InputLabel>
                      <TextField
                        {...field}
                        fullWidth
                        id="isbn_number"
                        name="isbn_number"
                      />
                      {errors.isbn_number && <div className="errorMessageStyle">{errors.isbn_number.message}</div>}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="published_on"
                  control={control}
                  rules={{
                    required: 'Publication Year is required',
                  }}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="published_on">Publication Year</InputLabel>
                      <TextField
                        {...field}
                        fullWidth
                        id="published_on"
                        name="published_on"
                      />
                      {errors.published_on && <div className="errorMessageStyle">{errors.published_on.message}</div>}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="available"
                  defaultValue={true}
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputLabel htmlFor="available">Available</InputLabel>
                      <Switch
                        {...field}
                        name='available'
                        id='availbale'
                        checked={bookAvailable}
                        onChange={handleToggle}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
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
  )
}


const AddBookMoDal = ({ isOpen, handleClose, initialData }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <AddBook handleClose={handleClose} bookdata={initialData} />
    </Dialog>
  );
};

export default AddBookMoDal;