const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
    book: String,
    bookid:String,
    userid: String,
    review: String,
})
const ReviewData = mongoose.model('review', reviewSchema);
module.exports = ReviewData;