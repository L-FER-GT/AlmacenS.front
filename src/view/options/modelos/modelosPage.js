import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
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
import { recuperarProveedores } from "../../../conexion/ConsultasProveedor";
//TIPO DE IMAGEN
const tipoImagen = "MODEL";
//------------------------------MAIN--------------------------//

const ModelosPage = () => {
  const [openNewImage, setOpenNewImage] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [dataImageProveedor, setDataImageProveedor] = useState(null);
  const [listImage, setListImage] = useState([]);
  const [listaModelos, setListaModelos] = useState([]);
  const [listaProveedores, setListaProveedores] = useState([]);
  const [proovedorSelected, setProveedorSelected] = useState("");

  const [subidoConExito, setSubidoConExito] = useState(false);
  const [modeloInfo, setModeloInfo] = useState({
    Nombre: "",
    Descripcion: "",
    Material: "",
    Tipo: "",
    foto: "",
  });

  function cargarListaModelos() {
    recuperarModelos({
      onCallBackData: (data) => {
        setListaModelos(data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }
  function cargarListaProveedores() {
    recuperarProveedores({
      onCallBackData: (data) => {
        setListaProveedores(data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }
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
    cargarListaProveedores();
    cargarListaModelos();
  }, []);
  const handleChange = (e) => {
    setModeloInfo({
      ...modeloInfo,
      [e.target.name]: e.target.value,
    });
  };

  function limpiarModelo() {
    setModeloInfo({
      Nombre: "",
      Descripcion: "",
      Material: "",
      Tipo: "",
      foto: "",
    });
    setDataImage(null);
    setDataImageProveedor(null);
    setProveedorSelected("");
  }

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
    subirNuevoModelo({
      onCallBackData: (data) => {
        limpiarModelo();
        cargarListaModelos();
        setSubidoConExito(true);
      },
      onError: (err) => {
        console.error(err);
      },
      sendData: {
        ID_Proveedor: proovedorSelected,
        Nombre: modeloInfo.Nombre,
        Descripcion: modeloInfo.Descripcion,
        Material: modeloInfo.Material,
        Tipo: modeloInfo.Tipo,
        Imagen_Asociada: modeloInfo.foto,
      },
    });
  };

  const [selectedValue, setSelectedValue] = useState("crear"); // Estado para almacenar el valor seleccionado

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  //CONTROL ALMACEN SELECCIONADO
  const [modelSelected, setModelSelected] = useState("");

  function seleccionarModelo(e) {
    setModelSelected(e.target.value);

    const modelosEncontrado = listaModelos.filter(
      (modelo) => modelo.ID_Producto === e.target.value
    );
    const modeloActual = modelosEncontrado[0];
    getImageByID({
      onCallBackData: (data) => {
        setDataImage(data);
      },
      sendData: { id: modeloActual.Imagen_Asociada },
    });
    setModeloInfo({
      Nombre: modeloActual.Nombre,
      Descripcion: modeloActual.Descripcion,
      Material: modeloActual.Material,
      Tipo: modeloActual.Tipo,
      foto: modeloActual.Imagen_Asociada,
    });
    setProveedorSelected(modeloActual.ID_Proveedor);
    changeImageProveedor(modeloActual.ID_Proveedor);
  }

  useEffect(() => {
    limpiarModelo();
  }, [selectedValue]);
  function onModificarModelo() {
    if (modelSelected !== "") {
      editarModelo({
        sendData: {
          ID_Producto: modelSelected,
          ID_Proveedor: proovedorSelected,
          Nombre: modeloInfo.Nombre,
          Descripcion: modeloInfo.Descripcion,
          Material: modeloInfo.Material,
          Tipo: modeloInfo.Tipo,
          foto: modeloInfo.Imagen_Asociada,
        },
        onCallBackData: () => {
          cargarListaModelos();
          limpiarModelo();
          setSubidoConExito(true);
        },
        onError: (err) => {
          console.error(err);
        },
      });
    }
  }
  function changeImageProveedor(ID_Proveedor) {
    const proveedorEncontrado = listaProveedores.filter(
      (proveedor) => proveedor.ID_Proveedor === ID_Proveedor
    );
    const proveedorActual = proveedorEncontrado[0];
    getImageByID({
      onCallBackData: (data) => {
        setDataImageProveedor(data);
      },
      sendData: { id: proveedorActual.Imagen_Asociada },
    });
  }
  function onSelectProveedor(e) {
    setProveedorSelected(e.target.value);
    changeImageProveedor(e.target.value);
  }
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
              CONTROL PRODUCTOS MODELOS
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedValue} // Asigna el valor seleccionado al RadioGroup
              onChange={handleRadioChange} // Maneja el cambio de selección
            >
              <FormControlLabel
                value="crear"
                control={<Radio />}
                label="Nuevo Almacen"
              />
              <FormControlLabel
                value="editar"
                control={<Radio />}
                label="Editar Almacenes"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid container>
          <Grid item container xs={6} justifyContent={"center"}>
            <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px" }}>
              {selectedValue === "editar" && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Seleccionar Modelos</InputLabel>
                  <Select
                    name="modelo"
                    value={modelSelected}
                    onChange={seleccionarModelo}
                  >
                    {listaModelos.map((item) => (
                      <MenuItem key={item.ID_Producto} value={item.ID_Producto}>
                        {item.Nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <Grid container>
                <Grid item container xs={9}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Proveedor</InputLabel>
                    <Select
                      name="modelo"
                      value={proovedorSelected}
                      onChange={onSelectProveedor}
                    >
                      {listaProveedores.map((item) => (
                        <MenuItem
                          key={item.ID_Proveedor}
                          value={item.ID_Proveedor}
                        >
                          {item.Nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1} />
                <Grid container item xs={2}>
                  <ImageView
                    imageData={dataImageProveedor}
                    height={"50px"}
                    width={"50px"}
                    text=""
                  />
                </Grid>
              </Grid>
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Nombre"
                name="Nombre"
                value={modeloInfo.Nombre}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Descripcion"
                name="Descripcion"
                value={modeloInfo.Descripcion}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Material"
                name="Material"
                value={modeloInfo.Material}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Tipo Calzado"
                name="Tipo"
                value={modeloInfo.Tipo}
                onChange={handleChange}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Foto del Lugar</InputLabel>
                <Select
                  name="foto"
                  value={modeloInfo.foto}
                  onChange={seleccionarImagen}
                >
                  {listImage.map((item) => (
                    <MenuItem key={item.ID_Image} value={item.ID_Image}>
                      {item.Nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedValue === "crear" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Agregar Modelo
                </Button>
              )}
              {selectedValue === "editar" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onModificarModelo}
                >
                  Editar Modelo
                </Button>
              )}

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
              height={"400px"}
              width={"400px"}
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

export default ModelosPage;
