import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Container } from '@mui/material'

const Main = (props) => {
  return (
    <div>
        <Navbar/>
        <Container component="middle" maxWidth="lg" sx={{padding:"30px"}}>
        <div className='main_content'>
        {props.child}
        </div>
        </Container>
        <Footer/>
    </div>
  )
}

export default Main