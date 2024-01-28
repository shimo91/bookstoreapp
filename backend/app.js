const express = require('express')
const app = new express()
require('dotenv').config()
const cors = require('cors')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT

const morgan= require('morgan');
app.use(morgan('dev'));

require('./config/dbConnection')

// signup route
const signupRoutes = require('./Routes/signupRoutes')
app.use('/signup', signupRoutes)

//login route
const loginRoutes = require('./Routes/loginRoutes')
app.use('/login',loginRoutes)

//book route
const bookRoutes = require('./Routes/bookRoutes')
app.use('/books',bookRoutes)


app.listen(PORT,()=>{
    console.log('Listening to '+ PORT)
})