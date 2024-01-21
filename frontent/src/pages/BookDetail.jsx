import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';


const BookDetail = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <Grid container sx={{ minHeight: '78vh' ,marginBottom:'30px'}} component={Paper} elevation={6} square>
      <CssBaseline />
      <Grid item
        xs={false}
        sm={4}
        md={4}
      >
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={process.env.PUBLIC_URL + '/cover/cover1.jpg'} />
        </Box>

      </Grid>
      <Grid item xs={12} sm={8} md={8} >
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Harry Potter and the Cursed Child - Parts One and Two
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <p>Author : by J. K. Rowling</p>
            <p>published : July 31, 2016</p>
            <p>Genre: Fantasy, Novel, Young Adult, Collectible</p>
            <p>ISBN: 9781338099133</p>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Grid>
      <Container width="lg">
        <Grid item
          xs={false}
          sm={12}
          md={12}
        >
          <p className='alignJustify'>Description: The Eighth Story. Nineteen Years Later. Based on an original new story by J.K.
            Rowling, John Tiffany, and Jack Thorne, a new play by Jack Thorne,
            "Harry Potter and the Cursed Child" is the eighth story in the Harry Potter series and the first official Harry Potter story to be presented on stage.
            The play will receive its world premiere in London's West End on July 30, 2016.
            It was always difficult being Harry Potter and it isn't much easier now that he is an overworked employee of the Ministry of Magic,
            a husband and father of three school-age children. While Harry grapples with a past that refuses to stay where it belongs, his youngest son Albus must struggle with the weight of a family legacy he never wanted.
            As past and present fuse ominously, both father and son learn the uncomfortable truth: sometimes,
            darkness comes from unexpected places. This Special Rehearsal Edition will be available to purchase until early 2017, after which a Definitive Edition of the script will go on sale.
          </p>
        </Grid>
      </Container>
    </Grid>

  )
}

export default BookDetail