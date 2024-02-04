import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const ProovedoresPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh', // Ajusta la altura según tus necesidades
      }}
    >
      <div style={{margin: '25%'}}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="275"
          image= {"https://logo.clearbit.com/puma.com"}
          alt='Puma'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Puma
          </Typography>
          <Typography variant="body2" color="text.secondary">
          the Fastest Sports Brand in the World. Shop for Men, Women and Kids Clothing, Shoes & Accessories.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      </div>
    </Box>
  );
};

export default ProovedoresPage;