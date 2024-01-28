import { Alert, Avatar, Box, Button, Collapse, Container, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material'
import { jwtDecode } from "jwt-decode";
import { Controller, useForm } from "react-hook-form"
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const { control, handleSubmit, setValue, watch, formState: { errors }, clearErrors, reset } = useForm();


  const navigate = useNavigate();

  const [openF, setOpenF] = useState(false);
  const [errordata, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const onSubmit = async (data) => {
    console.log("form data", data)


    const formData = {
      username: data.username,
      password: data.password,
    }

    try {
      const response = await axios.post('http://127.0.0.1:4000/login', formData);
      console.log("msg :" + response.data.message);
      if (response.data.message === 'success') {
        sessionStorage.setItem('userToken', response.data.token);
        sessionStorage.setItem('username', data.username);
        console.log(data.username);
        // console.log('topicstatus'+topicstatus)
        const token = sessionStorage.getItem("userToken");
        const decodeToken = jwtDecode(token);
        console.log("navigate")
        // Navigate to the login page
        navigate('/books');
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
      //console.log("errordata",errordata)
      setOpenF(true);
      setTimeout(() => {
        setOpenF(false);
        window.location.reload();
      }, 4000);
    }
  };


  return (
    <div>
      <Box sx={{ width: '100%' }}>

        <Collapse in={openF}>
          {/* Conditionally render the Alert if there's an error */}
          {errordata && (
            <Alert sx={{ mb: 2 }} severity="error" id="failedText">
              {errordata}
            </Alert>
          )}
        </Collapse>
      </Box>
      <Box

        maxWidth="lg"
        className='EmpForm'
      >
        <Grid container spacing={2} >

          <Grid item xs={12} sm={12} className='signinformbg'>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justify: "center"
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#871427' }}>
                <LockOpenIcon sx={{ color: (255, 255, 255) }} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in to your account
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} >

                      <Controller
                        name="username"
                        control={control}
                        rules={{ required: 'Email address is required' }}
                        render={({ field }) => (
                          <>
                            <TextField
                              {...field}
                              fullWidth
                              id="username"
                              name="username"
                              required
                              placeholder="Enter your email address"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {errors.username && <div className="errorMessageStyle">{errors.username.message}</div>}
                          </>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="password"
                        control={control}
                        rules={{
                          required: 'Password is required',
                        }}
                        render={({ field }) => (
                          <>
                            <TextField
                              {...field}
                              fullWidth
                              id="password"
                              name="password"
                              placeholder="Enter your password"
                              type={showPassword ? 'text' : 'password'}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleTogglePasswordVisibility}
                                      edge="start"
                                    >
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {errors.password && <div className="errorMessageStyle">{errors.password.message}</div>}
                          </>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3, mb: 2, bgcolor: '#871427', color: (255, 255, 255),
                      '&:hover': {
                        bgcolor: '#a3293d',
                      },
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <div className="bg-img"></div>
          </Grid>
        </Grid>
      </Box>

    </div>
  );
}

export default Login;