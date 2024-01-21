import * as React from 'react';
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Card, CardMedia, Collapse } from '@mui/material';
import { Controller, useForm } from "react-hook-form"
import Alert from '@mui/material/Alert';

export default function SignUp() {

  const { control, handleSubmit, setValue, watch, formState: { errors }, clearErrors, reset } = useForm();


  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const [openF, setOpenF] = useState(false);
  const [error, setError] = useState(null);


  const onSubmit = async (data) => {
    console.log("form data", data)


    const formData = {
      username: data.email,
      password: data.password,
      phone: data.phoneNumber,
      first_name: data.firstName,
      last_name: data.lastName,
      user_status: true,
    }
    try {
      const response = await axios.post('http://127.0.0.1:4000/signup', formData);
      console.log("msg :" + response.data.message);
      if (response.data.success) {
        // Navigate to the login page
        navigate('/login');
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate('/login');
        }, 3000);

      }
      return response.data;
    } catch (error) {
      console.log("error", error);
      //alert(error.response.data.message)
      //throw error;
      
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

      setOpenF(true);
      setTimeout(() => {
        setOpenF(false);
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <div className='signup'>
      <Box sx={{ width: '100%' }}>
        <Collapse in={open}>
          <Alert sx={{ mb: 2 }}
            severity="success"
          >
            Registered successfully, Please login.
          </Alert>
        </Collapse>
        <Collapse in={openF}>
          {/* Conditionally render the Alert if there's an error */}
          {error && (
            <Alert sx={{ mb: 2 }} severity="error" id="failedText">
              {error}
            </Alert>
          )}
        </Collapse>
      </Box>
      <Box
        sx={{
          pt: 1,
          pb: 8,
        }}
      >

        <Container component="main" maxWidth="lg" className='signupbg' >
          <Grid container spacing={2} sx={{ padding: 5 }}>
            <Grid item xs={12} sm={6}>
              <Card className='signupCard'>
                <CardMedia
                  sx={{ height: 460 }}
                  image={`${process.env.PUBLIC_URL}/images/signupbg.jpg`}
                  title="green iguana"
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justify: "center"
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: '#871427' }}>
                  <LockOutlinedIcon sx={{ color: (255, 255, 255) }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>

                        <Controller
                          name="firstName"
                          control={control}
                          rules={{ required: 'First Name is required' }}
                          render={({ field }) => (
                            <>
                              <TextField
                                {...field}
                                autoComplete="given-name"
                                name="firstName"
                                fullWidth
                                id="firstName"
                                label="First Name"
                              />
                              {errors.firstName && <div className="errorMessageStyle">{errors.firstName.message}</div>}
                            </>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          name="lastName"
                          control={control}
                          rules={{ required: 'Last Name is required' }}
                          render={({ field }) => (
                            <>
                              <TextField
                                {...field}
                                name="lastName"
                                fullWidth
                                id="lastName"
                                label="Last Name"
                              />
                              {errors.lastName && <div className="errorMessageStyle">{errors.lastName.message}</div>}
                            </>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          name="email"
                          control={control}
                          rules={{
                            required: 'Email address is required',
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Invalid email address',
                            }
                          }}
                          render={({ field }) => (
                            <>
                              <TextField
                                {...field}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                              />
                              {errors.email && <div className="errorMessageStyle">{errors.email.message}</div>}
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
                      {/* made changes here */}
                      <Grid item xs={12}>
                        <Controller
                          name="password"
                          control={control}
                          rules={{
                            required: 'Password is required',
                            minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters',
                            }
                          }}
                          render={({ field }) => (
                            <>
                              <TextField
                                {...field}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                              />
                              {errors.password && <div className="errorMessageStyle">{errors.password.message}</div>}
                            </>
                          )}
                        />
                      </Grid>
                      {/* change ends here */}
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3, mb: 2, bgcolor: '#871427', color: (255, 255, 255),
                        '&:hover': {
                          bgcolor: '#a3293d', // Change to the desired hover color
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="center">
                      <Grid item>

                        <Button sx={{ color: '#000' }} style={{ textTransform: 'none' }} href="/login">
                          Already have an account? Sign in
                        </Button>

                      </Grid>
                    </Grid>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
    </div>

  );
}