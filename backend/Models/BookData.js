const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;
const bookSchema = Schema({
    title: String,
    subtitle: String,
    author: String,
    imageUrl: String,
    genre: String,
    available: {
        type: Boolean,
        default: true,
    },
    description:String,
    isbn_number:String,
    language:String,
    published_on:String,
    rental_period:Number,
    reviews: [
        {
          username: String,
          content: String
        }
      ],
      rentUser: [
        {
          userid: ObjectId,
          username:String,
          libraryid:String,
          address:String,
          phoneNumber:String,
          user_status:{
            type:Boolean,
            default:true,
          }
        }
      ],

})
const BookData = mongoose.model('book', bookSchema);
module.exports = BookData;