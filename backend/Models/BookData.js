const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
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
    rental_period:Number
})
const BookData = mongoose.model('book', bookSchema);
module.exports = BookData;