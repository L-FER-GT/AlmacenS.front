import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ImageUploadDialog from '../../dialogs/dialogNewImage';
import ImageView from '../../components/imageView';
//  QUIERIES
import { getImageByID } from '../../../conexion/ConsultasProveedor';

const WelcomePage = () => {
  const [openDialog,setOpenDialog]=useState(false);
  // const [image, setImage]=useState(null);
  // function obtenerImagen(){
  //     getImageByID({onCallBackData:(data)=>{console.log(data);
  //     setImage(data)},sendData:{id:1}})
  // }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh', // Ajusta la altura según tus necesidades
      }}
    >
      {/* <ImageView imageData={image} height={'300px'} width={'300px'}/>
      <ImageUploadDialog open={openDialog} onClose={()=>{setOpenDialog(false)}}/> */}
      <Typography variant="h3" fontWeight="bold" fontStyle="italic">
        Bienvenido!
      </Typography>
      {/* <Button onClick={obtenerImagen//()=>{setOpenDialog(true)}
    }>Open</Button> */}
    </Box>
  );
};

export default WelcomePage;