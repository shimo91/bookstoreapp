import React from 'react'
import UserNavbar from './UserNavbar'
import BookFooter from './UserFooter'
import { Container } from '@mui/material'

const UserMain = (props) => {
    return (
      <div>
          <UserNavbar/>
          <Container component="middle" maxWidth="lg" sx={{padding:"30px"}}>
          <div >
          {props.child}
          </div>
          </Container>
          <BookFooter/>
      </div>
    )
  }

export default UserMain