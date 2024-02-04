import React, { useState, useEffect} from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

const ImageView = ({imageData,height,width}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLarge, setIsLarge]=useState(false);
  useEffect(() => {
    // Convierte el buffer a una URL de datos
    if (imageData && imageData.type && imageData.data) {
      const bufferData = new Uint8Array(imageData.data);
      const blob = new Blob([bufferData], { type: imageData.type });
      const imageUrl = URL.createObjectURL(blob);
      // Crea una nueva imagen y obtén su tamaño
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setIsLarge(img.width>img.height)
        setImageSrc(imageUrl);
      };
    }
  }, [imageData]);
  return (
    <Box mt={5}>
      <Paper elevation={5} style={{ width: width, height: height, position: 'relative' }}>
        <Grid container style={{height:'100%'}} alignItems={'center'}>
          
        <Grid item container xs={12} justifyContent={'center'} alignContent={'center'}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Imagen"
            style={isLarge?{ width: width }:{ height: height}}
          />
        ) : (
          <Typography
            variant="body1"
            component="div"
          >
            Contenido blanco por defecto
          </Typography>
        )}
        </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ImageView;
