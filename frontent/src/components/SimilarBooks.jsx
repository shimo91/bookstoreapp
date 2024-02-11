import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { arrayBufferToBase64 } from '../utils';

const cardStyle = {
    maxWidth: 200,
    margin: '8px', // Adjust the margin as needed
};

const SimilarBooks = ({ similarBooks }) => {

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true
    };
    return (
        <Slider {...settings}>
            {similarBooks.map((book) => (
                <Link to={`/bookDetail/${book._id}`} className='linkStyle'>
                    <Card key={book._id} style={cardStyle}>
                        <CardActionArea style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={book.imageUrl && `data:image/jpeg;base64,${arrayBufferToBase64(book.imageUrl.data)}`} style={{ height: '250px', marginTop: '15px' }} alt={book.title} />
                            <CardContent className='linkStyle' style={{ textAlign: 'center' }}>
                                <Typography gutterBottom variant="h6" component="div" color="text.secondary">
                                    {book.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {book.author}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            ))}
        </Slider>
    )
}

export default SimilarBooks