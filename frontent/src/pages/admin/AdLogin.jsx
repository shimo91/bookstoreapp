import React, { useState } from 'react'
import { Box, Button, Container, CssBaseline, Grid, InputAdornment, TextField, Typography, makeStyles } from '@mui/material';
import '../../css/admin/Style.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Controller, useForm } from "react-hook-form"
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordIcon from '@mui/icons-material/Password';

const AdLogin = () => {
  const { control, handleSubmit, setValue, watch, formState: { errors }, clearErrors, reset } = useForm();

  const navigate = useNavigate();
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
      const response = await axios.post('http://127.0.0.1:4000/login/admin/', formData);
      console.log("msg :" + response.data.message);
      if (response.data.message === 'success') {
        sessionStorage.setItem('adminToken', response.data.token);
        sessionStorage.setItem('username', data.username);
        console.log(data.username);
        // console.log('topicstatus'+topicstatus)
        const token = sessionStorage.getItem("adminToken");
        const decodeToken = jwtDecode(token);
        //console.log("navigate")
        // Navigate to the login page
        navigate('/adminHome');
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

      toast.error(errordata, {
        // Set to 15sec
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <Container component="main" maxWidth="false" className='adminLogin'>
      <Box sx={{ width: '100%' }}>
        {/* For notifications */}
        <ToastContainer />
      </Box>
      <CssBaseline />
      <div className='adminDiv'>
        <div className='adminDiv2'>
          <Container spacing={3} maxWidth="xs" component="filter">
            <Typography component="h1" variant="h5">
              Admin Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="username"
                control={control}
                rules={{ required: 'Username is required' }}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoFocus
                      placeholder="Enter your username"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.username && <div className="errorMessageStyle">{errors.username.message}</div>}
                  </>
                )}
              />
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
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      id="password"
                      placeholder="Enter your password"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PasswordIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"

              >
                Sign In
              </Button>
            </form>
          </Container>
        </div>
      </div>
    </Container>
  )
}

export default AdLogin