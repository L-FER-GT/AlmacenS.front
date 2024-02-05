import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,Typography,
  InputLabel,
  FormControl,
  Paper,
  Alert,
  Grid,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
//COMPONENTES
import ImageView from "../../components/imageView";
import ImageUploadDialog from "../../dialogs/dialogNewImage";
import DialogConfirmAccess from "../../dialogs/dialogConfirmAcces";
//QUERIES
import { getImageByID } from "../../../conexion/ConsultasProveedor";
import { subirNuevoAlmacen } from "../../../conexion/ConsultasAlmacen";
import { newConectionAlmacen } from "../../../conexion/ConsultasAlmacen";
import { getImagesType } from "../../../conexion/ConsultasProveedor";
import { recuperarAlmecenes } from "../../../conexion/ConsultasAlmacen";
import { recuperarConexionesAlmacen } from "../../../conexion/ConsultasAlmacen";
import { editarAlmacen } from "../../../conexion/ConsultasAlmacen";
import { editarModelo } from "../../../conexion/ConsultasProducto";
import { subirNuevoModelo } from "../../../conexion/ConsultasProducto";
import { recuperarModelos } from "../../../conexion/ConsultasProducto";
//TIPO DE IMAGEN
const tipoImagen = "MODEL";
//------------------------------MAIN--------------------------//

const ModelosPage = () => {
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
        MODELOS!
      </Typography>
      {/* <Button onClick={obtenerImagen//()=>{setOpenDialog(true)}
    }>Open</Button> */}
    </Box>
  );
};

export default ModelosPage;