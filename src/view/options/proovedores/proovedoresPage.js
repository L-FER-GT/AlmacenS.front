import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Alert,
  Grid,
} from "@mui/material";
//COMPONENTES
import ImageView from "../../components/imageView";
import ImageUploadDialog from "../../dialogs/dialogNewImage";
//QUERIES
import { getImagesType } from "../../../conexion/ConsultasProveedor";
import {
  getImageByID,
  subirNuevoProveedor,
} from "../../../conexion/ConsultasProveedor";
//TIPO DE IMAGEN
const tipoImagen='LOGO'
//------------------------------MAIN--------------------------//

const ProovedoresPage = () => {
  const [openNewImage, setOpenNewImage] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [listImage, setListImage] = useState([]);
  
  const [subidoConExito, setSubidoConExito] = useState(false);
  const [providerInfo, setProviderInfo] = useState({
    name: "",
    phone: "",
    logo: "",
  });

  function cargarListaImagenes() {
    getImagesType({
      onCallBackData: (data) => {
        setListImage(data);
      },
      onError: (err) => {
        console.error(err);
      },
      sendData: { tipo: tipoImagen },
    });
  }
  useEffect(() => {
    cargarListaImagenes();
  }, []);
  const handleChange = (e) => {
    setProviderInfo({
      ...providerInfo,
      [e.target.name]: e.target.value,
    });
  };

  function seleccionarImagen(e) {
    handleChange(e);
    getImageByID({
      onCallBackData: (data) => {
        setDataImage(data);
      },
      sendData: { id: e.target.value },
    });
  }

  const handleSubmit = () => {
    // Aquí puedes realizar la lógica para enviar los datos del proveedor al backend
    subirNuevoProveedor({
      onCallBackData: (data) => {
        setProviderInfo({
          name: "",
          phone: "",
          logo: "",
        });
        setSubidoConExito(true);
        setDataImage(null);
      },
      onError: (err) => {
        console.error(err);
      },
      sendData: {
        nombre: providerInfo.name,
        informacionContacto: providerInfo.phone,
        imagenAsociada: providerInfo.logo,
      },
    });
    // También puedes reiniciar los campos después de enviar los datos
  };
  return (
    <Box p={3}>
      <ImageUploadDialog
        open={openNewImage}
        tipoImagen={tipoImagen}
        onClose={() => {
          cargarListaImagenes();
          setOpenNewImage(false);
        }}
      />
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Agregar Proveedor
        </Typography>
        <Grid container>
          <Grid item container xs={6} justifyContent={"center"}>
            <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px" }}>
              <TextField
                label="Nombre"
                fullWidth
                name="name"
                value={providerInfo.name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Teléfono"
                fullWidth
                name="phone"
                value={providerInfo.phone}
                onChange={handleChange}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Logo de la empresa</InputLabel>
                <Select
                  name="logo"
                  value={providerInfo.logo}
                  onChange={seleccionarImagen}
                >
                  {listImage.map((item) => (
                    <MenuItem key={item.ID_Image} value={item.ID_Image}>
                      {item.Nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Agregar Proveedor
              </Button>
              
              {subidoConExito && (
              <Alert
                severity="success"
                onClose={() => setSubidoConExito(false)}
              >
                Subido con éxito
              </Alert>
            )}
            </Paper>
          </Grid>
          <Grid container item xs={6} justifyContent={"center"}>
            <ImageView
              imageData={dataImage}
              height={"300px"}
              width={"300px"}
            ></ImageView>
            <Grid item xs={12} style={{ height: "10px" }} />
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenNewImage(true);
                }}
              >
                Nueva Imagen
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProovedoresPage;
