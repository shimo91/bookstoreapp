import React from 'react'
import AdminNavbar from './Dashboard'
import AdminFooter from '../admin/AdminFooter'
import { Container } from '@mui/material'

const AdminMain = (props) => {
    return (
      <div>
          <AdminNavbar/>
          <Container component="middle" maxWidth="false" sx={{padding:"30px"}}>
          <div >
          {props.child}
          </div>
          </Container>
          <AdminFooter/>
      </div>
    )
  }

export default AdminMain