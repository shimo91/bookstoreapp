const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
const userSchema = mongoose.Schema({
    
    username: {
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        index: true 
    },
    password: {
        type:String,
        required: true
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    phone: {
        type: String
    
    },
    start_date: {
        type: Date
    },
    user_status: {
        type: Boolean,
        default: false, 
      },
})

const UserData = mongoose.model('userdatas',userSchema)
module.exports = UserData