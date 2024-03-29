import { Container, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    
      <Container component="footer" maxWidth="false" className='footer'>
        <div className='footerdiv'>
        <Typography variant="body2" align="center" sx={{padding:'1%'}}>
          © {new Date().getFullYear()} Book Store. All rights reserved.
        </Typography>
        </div>
        </Container>
   
  )
}

export default Footer