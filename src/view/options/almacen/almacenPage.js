import React, { useEffect, useState } from "react";
import {
  Box,
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
//COMPONENTES
import ImageView from "../../components/imageView";
import ImageUploadDialog from "../../dialogs/dialogNewImage";
//QUERIES
import { getImageByID } from "../../../conexion/ConsultasProveedor";
import { subirNuevoAlmacen } from "../../../conexion/ConsultasAlmacen";
import { newConectionAlmacen } from "../../../conexion/ConsultasAlmacen";
import { getImagesType } from "../../../conexion/ConsultasProveedor";
//TIPO DE IMAGEN
const tipoImagen = "LOCAL";
//------------------------------MAIN--------------------------//
const AlmacenPage = ({ idUser }) => {
  const [openNewImage, setOpenNewImage] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [listImage, setListImage] = useState([]);

  const [subidoConExito, setSubidoConExito] = useState(false);
  const [almacenInfo, setAlmacenInfo] = useState({
    Referencia: "",
    Pais: "",
    Departamento: "",
    Provincia: "",
    Distrito: "",
    Direccion: "",
    Capacidad: "",
    foto: "",
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
    setAlmacenInfo({
      ...almacenInfo,
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
  function agregarConeccion(idUsuario, idAlmacen) {
    newConectionAlmacen({
      sendData: { ID_Empleado: idUsuario, ID_Almacen: idAlmacen },
      onCallBackData: () => {
        setAlmacenInfo({
          Referencia: "",
          Pais: "",
          Departamento: "",
          Provincia: "",
          Distrito: "",
          Direccion: "",
          Capacidad: "",
          foto: "",
        });
        setSubidoConExito(true);
        setDataImage(null);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }
  const handleSubmit = () => {
    // Aquí puedes realizar la lógica para enviar los datos del proveedor al backend
    subirNuevoAlmacen({
      onCallBackData: (data) => {
        //idUser
        setAlmacenInfo({
          Referencia: "",
          Pais: "",
          Departamento: "",
          Provincia: "",
          Distrito: "",
          Direccion: "",
          Capacidad: "",
          foto: "",
        });
        setSubidoConExito(true);
        setDataImage(null);
        agregarConeccion(idUser, data.id);
      },
      onError: (err) => {
        console.error(err);
      },
      sendData: {
        Referencia: almacenInfo.Referencia,
        Pais: almacenInfo.Pais,
        Departamento: almacenInfo.Departamento,
        Provincia: almacenInfo.Provincia,
        Distrito: almacenInfo.Distrito,
        Direccion: almacenInfo.Direccion,
        Capacidad: almacenInfo.Capacidad,
        Capacidad_Utilizada: 0,
        Imagen_Referencial: almacenInfo.foto,
      },
    });
    // También puedes reiniciar los campos después de enviar los datos
  };
  return (
    <Box p={3}>
      <ImageUploadDialog
        tipoImagen={tipoImagen}
        open={openNewImage}
        onClose={() => {
          cargarListaImagenes();
          setOpenNewImage(false);
        }}
      />
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid container justifyContent={"center"} spacing={2}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              CONTROL ALMACEN
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="crear"
                control={<Radio />}
                label="Nuevo Almacen"
              />
              <FormControlLabel
                value="asignar"
                control={<Radio />}
                label="Asignar Almacen"
              />
              <FormControlLabel
                value="ver"
                control={<Radio />}
                label="Ver Almacenes"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid container>
          <Grid item container xs={6} justifyContent={"center"}>
            <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px" }}>
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Descripción/Referencia"
                name="Referencia"
                value={almacenInfo.Referencia}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="País"
                name="Pais"
                value={almacenInfo.Pais}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Departamento"
                name="Departamento"
                value={almacenInfo.Departamento}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Provincia"
                name="Provincia"
                value={almacenInfo.Provincia}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Distrito"
                name="Distrito"
                value={almacenInfo.Distrito}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Dirección"
                name="Direccion"
                value={almacenInfo.Direccion}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Capacidad"
                type="number"
                name="Capacidad"
                value={almacenInfo.Capacidad}
                onChange={handleChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Foto del Lugar</InputLabel>
                <Select
                  name="foto"
                  value={almacenInfo.foto}
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
                Agregar Almacen
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

export default AlmacenPage;
