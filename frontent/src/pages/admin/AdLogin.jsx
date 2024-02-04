import React from 'react'
import { Button, Container, CssBaseline, Grid, TextField, Typography, makeStyles } from '@mui/material';
import '../../css/admin/Style.css'
import { useNavigate } from 'react-router-dom';

const AdLogin = () => {
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/adminHome')
    
  };
  return (
    <Container component="main" maxWidth="false" className='adminLogin'>
      <CssBaseline />
      <div className='adminDiv'>
        <div className='adminDiv2'>
          <Container spacing={3} maxWidth="xs" component="filter">
              <Typography component="h1" variant="h5">
                Admin Login
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
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