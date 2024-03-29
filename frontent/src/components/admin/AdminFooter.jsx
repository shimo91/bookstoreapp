import { Container, Typography } from '@mui/material'
import React from 'react'

const AdminFooter = () => {
  return (
    
      <Container component="footer" maxWidth="false" className='userfooter'>
        <div className='footerdiv'>
        <Typography variant="body2" align="center" sx={{padding:'1%'}}>
          © 2024 Book Store. All rights reserved.
        </Typography>
        </div>
        </Container>
   
  )
}

export default AdminFooter